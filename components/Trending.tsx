import Card from "@/components/Card"
import cardio from "@/styles/cardio.module.css"
import styles from "@/styles/search.module.css"
import { getTitle } from "@/utils/helpers"
import Link from "next/link"
// Skeleton
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function Trending({ trending }: { trending: any[] }) {
  return (
    <section className={styles.billboard_Main}>
      <div className={styles.billboard_HeaderMain}>
        <p className={styles.billboard_Header}>Trending</p>
        <Link href={`/search/trending`}>view all</Link>
      </div>
      <section className={cardio.cardsContainer}>
        {trending.length > 0
          ? trending
              .slice(0, 7)
              .map(
                ({
                  anilistId,
                  poster,
                  sub_episodes,
                  dub_episodes,
                  totalEpisodes,
                  title,
                  isAdult,
                }: {
                  anilistId: string
                  poster: string
                  sub_episodes: []
                  dub_episodes: []
                  totalEpisodes: string | number
                  title: { english?: string; romaji?: string; native?: string }
                  isAdult: string
                }) => (
                  <Card
                    key={anilistId}
                    id={anilistId}
                    image={poster}
                    subCount={sub_episodes.length}
                    dubCount={dub_episodes.length}
                    totalCount={totalEpisodes}
                    title={getTitle(title)}
                    isAdult={isAdult}
                  />
                )
              )
          : Array.from({ length: 7 }).map((_, index: number) => {
              return (
                <Skeleton
                  key={index}
                  height={273}
                  baseColor="var(--secondary)"
                  highlightColor="var(--background)"
                />
              )
            })}
      </section>
    </section>
  )
}
