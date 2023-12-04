import ReactPlayer from "react-player";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";
export function VideoPlayer({
  url,
  cover,
  index,
  title,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef();

  const isVisible = useCallback(() => {
    const target = document.getElementById(`player_${index}`);
    if (target) {
      const windowHeight = window.innerHeight;
      const currentTragetOffsetY = Math.abs(
        target.offsetTop - window.pageYOffset
      );

      if (currentTragetOffsetY <= windowHeight / 2) {
        setIsPlaying(true);
        let m1 = 0;
        let m2 = 0;      
        var timer;
        const Data = () => {
          m2 = document.documentElement.scrollTop || document.body.scrollTop;
          if (m2 === m1) {
            const target = document.getElementById(`player_${index}`);
            if (target)
              window.scrollTo({ behavior: "smooth", top: target?.offsetTop });
          }
        };
        m1 = document.documentElement.scrollTop || document.body.scrollTop;
        if (timer) clearTimeout(timer);
        timer = setTimeout(Data, 300);
      } else {
        setIsPlaying(false);
      }
    }
  }, [ index]);

  useEffect(() => {
    window.addEventListener("scroll", isVisible);
    window.addEventListener("resize", isVisible);
  }, [isVisible]);

  const isChrome = useMemo(
    () => navigator.userAgent.indexOf("Chrome") > -1,
    []
  );
  return (
    <div
      key={`player_block_${index}`}
      id={`player_${index}`}
      style={{ minHeight: "100vh", width: "100vw", backgroundColor: "#282c34" }}
    >
      <div className="landingPage__title">{title}</div>
      <ReactPlayer
        key={`player_${index}`}
        ref={playerRef}
        style={{ minHeight: "calc(100vh - 3rem)", backgroundColor: "black" }}
        url={url}
        loop={true}
        // muted={!playing}
        playsinline={true}
        playing={isPlaying}
        volume={0.8}
        width="100%"
        heght="calc(100vh - 3rem)"
        onReady={() => {
          var videoTags = document.getElementsByTagName("video");
          const createEvent = new MouseEvent("click", {
            clientX: 150,
            clientY: 150,
            view: window,
            bubbles: true,
          });
          videoTags[0].muted = true;
          videoTags[0].play();
          if (isChrome) {
            document.dispatchEvent(createEvent);
            window.addEventListener("click", (event) => {
              videoTags[0].muted = false;
            });
          }
        }}
        controls={isPlaying}
        config={{
          file: {
            attributes: {
              poster: cover,
              crossOrigin: "true",
            },
          },
        }}
      />
    </div>
  );
}
