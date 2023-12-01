import ReactPlayer from "react-player";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "./style.scss";
export function VideoPlayer({
  url,
  cover,
  playing,
  changePlayer,
  index,
  title,
}) {
  const playerRef = useRef();
  const isVisible = useCallback(() => {
    const target = document.getElementById(`player_${index}`);
    if (target) {
      const windowHeight = window.innerHeight;
      const currentTragetOffsetY = target.offsetTop - window.pageYOffset;

      if (currentTragetOffsetY < windowHeight / 2) {
        changePlayer(index);
      }
    }
  }, [changePlayer, index]);
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
        playing={playing}
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
        controls={playing}
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
