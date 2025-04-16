
import Image from "next/image";

import play4Image from "../img/play4.png"; 

export default function Section5() {
    return(
        <div className="section-five">
        <div className="container text-center">
          <div className="video-wrapper">
            <a href="https://www.youtube.com/watch?v=WvyK40w1EPY">
              <a href="#" className="video-icon">
                <Image src={play4Image} width={50} height={50} alt="Play Video" />
              </a>
            </a>
            <h2>
              With our specialists, and experts at
              <br />
              your disposal, you will face complex.
            </h2>
          </div>
        </div>
      </div>
    );
}