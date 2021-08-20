import { useEffect, useState } from "react";
import Card from "../UI/Card";
import Classes from "./AvailableMeals.module.css";
import MealItem from "./MealsItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://foodorderapp-a10ae-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={Classes.MealsLoading}>
        <p>loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={Classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const MealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={Classes.meals}>
      <ul>
        <Card>{MealsList}</Card>
      </ul>
    </section>
  );
};
export default AvailableMeals;
