// /app/categories/[categoryId]/page.tsx
import { api } from '../../../services/api';

interface Movie {
  id: number;
  title: string;
  poster: string;
}

// Função que busca filmes por categoria (executada no servidor)
async function fetchMoviesByCategory(categoryId: string) {
  const { data } = await api.get(`/categories/${categoryId}/movies`);
  return data;
}

interface CategoryPageProps {
  params: { categoryId: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const movies: Movie[] = await fetchMoviesByCategory(params.categoryId);

  return (
    <main>
      <h1>Filmes da Categoria {params.categoryId}</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <img src={movie.poster} alt={movie.title} />
            <h4>{movie.title}</h4>
          </li>
        ))}
      </ul>
    </main>
  );
}
