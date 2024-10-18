import Link from "next/link";
import { api } from "../../../services/api";

interface Category {
  id: number;
  imagem: string;
  name: string;
}

export default async function Home() {
  let categories: Category[] = [];

  try {
    const { data } = await api.get("/categories");
    categories = data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
  }

  return (
    <main>
      <ul>
        {categories.map((categorie) => (
          <li key={categorie.id}>
              <img src={categorie.imagem} alt={categorie.name} />
              <Link href={`/categories/${categorie.id}`}>
                <h3>{categorie.name}</h3>
              </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
