import { IMovie } from "../Interfaces/MovieInterfaces"

interface IMovies {
    movies: IMovie[];
}
// vår props som vi får in från App.tsx tar vi och typar upp genom en destructuring
export default function Movies({ movies }: IMovies) {
  return (
    <section>
        {
            movies.map((movie) => 
                <article key={movie.id}>
                    <h2>{movie.title}</h2>
                    <p>{movie.rt_score}</p>
                </article>
            )
        }
    </section>
  )
}
