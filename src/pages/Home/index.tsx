import { Coffee, Package, ShoppingCart, Timer } from "@phosphor-icons/react";
import { useTheme } from "styled-components";

import { CoffeeCard } from "../../components/CoffeeCard";
import { Loading } from "../../components/Loading";

import { CoffeeList, Heading, Hero, HeroContent, Info } from "./styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { number } from "zod";

interface Coffee {
  id: string;
  title: string;
  description: string;
  tags: string[];
  price: number;
  image: string;
  quantity: number;
}
export function Home() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const theme = useTheme();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/coffee",
    }).then((response) => {
      setCoffees(response.data);
    });
    // request para a API para pegar os cafés
    // e setar no estado
  }, []);

  function incrementQuantity(id: string) {
    setCoffees((prevCoffees) =>
      prevCoffees.map((coffee) =>
        coffee.id === id && coffee.quantity < 5
          ? { ...coffee, quantity: coffee.quantity + 1 }
          : coffee
      )
    );

    // Aqui você pode fazer a lógica para incrementar a quantidade do café
  }

  function decrementQuantity(id: string) {
    setCoffees((prevCoffees) =>
      prevCoffees.map((coffee) =>
        coffee.id === id && coffee.quantity > 0
          ? { ...coffee, quantity: coffee.quantity - 1 }
          : coffee
      )
    );
    // Aqui você pode fazer a lógica para decrementar a quantidade do café
  }

  return (
    <div>
      <Hero>
        <HeroContent>
          <div>
            <Heading>
              <h1>Encontre o café perfeito para qualquer hora do dia</h1>

              <span>
                Com o Coffee Delivery você recebe seu café onde estiver, a
                qualquer hora
              </span>
            </Heading>

            <Info>
              <div>
                <ShoppingCart
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["yellow-dark"] }}
                />
                <span>Compra simples e segura</span>
              </div>

              <div>
                <Package
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors["base-text"] }}
                />
                <span>Embalagem mantém o café intacto</span>
              </div>

              <div>
                <Timer
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.yellow }}
                />
                <span>Entrega rápida e rastreada</span>
              </div>

              <div>
                <Coffee
                  size={32}
                  weight="fill"
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors.purple }}
                />
                <span>O café chega fresquinho até você</span>
              </div>
            </Info>
          </div>

          <img src="/images/hero.svg" alt="Café do Coffee Delivery" />
        </HeroContent>

        <img src="/images/hero-bg.svg" id="hero-bg" alt="" />
      </Hero>

      <CoffeeList>
        <h2>Nossos cafés</h2>

        <div>
          {coffees.length === 0 ? (
            <Loading />
          ) : (
            coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={{
                  description: coffee.description,
                  id: coffee.id,
                  image: coffee.image,
                  price: coffee.price,
                  tags: coffee.tags,
                  title: coffee.title,
                  quantity: coffee.quantity,
                }}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            ))
          )}
        </div>
      </CoffeeList>
    </div>
  );
}
