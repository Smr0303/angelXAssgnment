import { useState, useEffect } from "react";

const useMakeRequest = (endpoint) => {
  const [result, setResult] = useState({
    data: null,
    error: null,
  });

  const json = [
    {
      id: 1,
      title: "Flowers",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/1.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 2,
      title: "Flowers",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/2.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 3,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/3.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 4,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/4.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 5,
      title: "Flowers",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/5.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 6,
      title: "Flowers",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/6.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
    {
      id: 7,
      title: "Flowers",
      price: 109.95,
      description:
        "Project",
      category: "Flowers",
      image: "/7.jpeg",
      rating: { rate: 3.9, count: 120 },
    },
  ];


  useEffect(() => {
    const asyncFunc = async () => {
      try {
        // const response = await fetch(endpoint);

        setResult((old) => ({ ...old, data: json }));
      } catch (error) {
        setResult((old) => ({ ...old, error: new Error(error).message }));
      }
    };

    asyncFunc();
  }, [endpoint]);

  return result;
};

export default useMakeRequest;
