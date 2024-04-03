import { memo } from "react";
import uniqolor from "uniqolor";

const NativeInfo = memo(({ styles, animeInfo }) => {
  return (
    <section className={styles.info}>
      <img className={styles.poster} src={animeInfo.poster} draggable="false" />
      <div>
        <p className={styles.title}>{animeInfo.title}</p>
        <p className={styles.description}>{animeInfo.description}</p>
        {animeInfo.status && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Status:</span> {animeInfo.status}
          </p>
        )}
        {animeInfo.aired && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Aired:</span> {animeInfo.aired}
          </p>
        )}
        {animeInfo.format && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Format:</span> {animeInfo.format}
          </p>
        )}
        {animeInfo.totalEpisodes && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Total Episodes:</span>
            {` ${animeInfo.totalEpisodes}`}
          </p>
        )}
        {animeInfo.episodeDuration && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Episode Duration:</span>
            {` ${animeInfo.episodeDuration}`}
          </p>
        )}
        {animeInfo.isAdult && (
          <p className={styles.seperator}>
            <span className={styles.blob}>isAdult?:</span>
            {` ${animeInfo.isAdult}`}
          </p>
        )}
        {animeInfo.synonyms && (
          <p className={styles.seperator}>
            <span className={styles.blob}>Synonyms:</span>
            {animeInfo.synonyms.map((syn, index) => {
              return <span key={index}>{` ${syn}.`}</span>;
            })}
          </p>
        )}
        <div className={styles.genres}>
          {animeInfo.genre &&
            animeInfo.genre.map((genre, index) => {
              const { color } = uniqolor(genre);
              return (
                <p
                  className={styles.genre}
                  key={index}
                  style={{ color: color }}
                >
                  {genre}
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
});

export default NativeInfo;
