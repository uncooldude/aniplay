"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Player from "@/components/Player";
import Info from "@/components/Info";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimeInfo } from "@/utils/workers";

export default function Streaming() {
  const params = useParams();
  const animeId = params.id;
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo>();
  const [episodes, setEpisodes] = useState<any>([]);
  const [streamLink, setStreamLink] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState<string>();
  const [episodeDownloadLink, setEpisodeDownloadLink] = useState("");
  const [sources, setSources] = useState([]);
  const [dubEpisodes, setDubEpisodes] = useState([]);
  const [nextAiringTime, setNextAiringTime] = useState({});
  const [noEpisodes, setNoEpisodes] = useState(false);

  const getStreamLink = async (episodeId: string) => {
    try {
      if (episodeId && episodeId !== "undefined") {
        const request = await fetch(`/api/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ episodeId }),
        });
        const response = await request.json();

        if (request.status === 200) {
          setStreamLink(response.sources[response.sources.length - 1].url);
          setCurrentEpisode(episodeId);
          setEpisodeDownloadLink(response.download);
          // get other external sources
          await getServerSources(episodeId);
        } else {
          console.log(response);
          // setNoEpisodes(true);
        }
      }
    } catch (error) {
      console.error("Error fetching stream link:", error, episodeId);
    }
  };

  const getAnimeInfo = async () => {
    try {
      const request = await fetch(`/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setNextAiringTime(response?.nextAiringEpisode);
        setAnimeInfo(response);
        setEpisodes(response?.sub_episodes);
        setDubEpisodes(response?.dub_episodes);
        setCurrentEpisode(
          response?.sub_episodes[0]?.id
            ? response?.sub_episodes[0]?.id
            : response?.dub_episodes[0]?.id
        );
        if (response?.sub_episodes[0]?.id) {
          getStreamLink(response?.sub_episodes[0]?.id);
        } else if (response?.dub_episodes[0]?.id) {
          getStreamLink(response?.dub_episodes[0]?.id);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Individual Episode Sources
  const getServerSources = async (episodeId: string) => {
    try {
      const request = await fetch(`/api/sources`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ episodeId }),
      });
      const response = await request.json();

      if (request.status === 200) {
        setSources(response);
      } else {
        console.log(response, episodeId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!streamLink) {
      getStreamLink(String(currentEpisode));
    }
  }, [episodes]);
  useEffect(() => {
    setDubEpisodes([]);
    getAnimeInfo();
    window.scrollTo({ top: 0 });
  }, [animeId]);
  return (
    <>
      <Navbar />
      <section className="container">
        <section className="streamingV2">
          {streamLink ? (
            <Player
              streamLink={streamLink}
              currentEpisode={currentEpisode}
              episodeDownloadLink={episodeDownloadLink}
              episodes={episodes}
              getStreamLink={getStreamLink}
              setStreamLink={setStreamLink}
              sources={sources}
              animeId={animeId}
              dubEpisodes={dubEpisodes}
              nextAiringEpisode={nextAiringTime}
              malId={animeInfo?.malId}
            />
          ) : noEpisodes ? (
            animeInfo?.trailer ? (
              <Player
                currentEpisode={currentEpisode}
                episodeDownloadLink={episodeDownloadLink}
                episodes={episodes}
                getStreamLink={getStreamLink}
                setStreamLink={setStreamLink}
                sources={sources}
                animeId={animeId}
                dubEpisodes={dubEpisodes}
                nextAiringEpisode={nextAiringTime}
                streamLink={`https://www.youtube.com/watch?v=${animeInfo.trailer.id}`}
                malId={animeInfo?.malId}
              />
            ) : (
              <p>No episodes or trailer available.</p>
            )
          ) : (
            <Loader />
          )}

          {animeInfo?.anilistId && <Info animeInfo={animeInfo} />}
        </section>
      </section>
      <Footer />
    </>
  );
}
