import Link from "next/link";
import play4Image from "../img/play4.png";
import Image from "next/image";

export default function Section2() {
    return (
        <div className="section-two">
            <div className="container">
                <div className="solution">
                    <div className="sol">
                        <h3>HR Made Simple, People Made Priority.</h3>
                        <h1>
                            Human <span className="highlight">Resource</span> Solution Partner
                        </h1>
                        <div className="btn-play">
                            <div className="btn-3">
                                <Link href="/contact">Contact Us</Link>
                            </div>

                            <div className="clear"></div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
                <div className="clear"></div>
            </div>
        </div>
    );
}