import Header from "../components/header"
import Footer from "../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function About() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>About Tiny Triumphs</title>
            </Head>

            <Header />
            <main>
                {/* About Tiny Triumphs */}
                <section> 
                    <h1>About Tiny Triumphs</h1>
                    <div>
                        <img 
                            src="https://picsum.photos/200/300"
                            alt="Placeholder"
                        />
                            {/* <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            /> */}
                        <div>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi harum veritatis ipsa! Fuga veritatis quae libero eos vitae nesciunt voluptatem est, eum aliquam, ex dignissimos sunt eveniet obcaecati odit aut?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi, itaque hic? Esse repudiandae quisquam quidem ea, cumque illum aliquid fuga possimus distinctio tempore omnis provident velit, veniam nobis soluta natus!</p>
                        </div>
                    </div>
                </section>
                {/* Meet the Creator */}
                <section>
                    <h2>Meet the Creator</h2>
                    <div>
                        <div>
                            <h3>Kylee Sawyer</h3>
                            <h4>Developer, Designer, and Creator</h4>
                            <div>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa architecto quo voluptas sequi commodi expedita molestiae ipsam quasi nesciunt? Dignissimos totam ut exercitationem vel doloremque neque perspiciatis nulla odio magni!</p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa architecto quo voluptas sequi commodi expedita molestiae ipsam quasi nesciunt? Dignissimos totam ut exercitationem vel doloremque neque perspiciatis nulla odio magni!</p>
                            </div>
                        </div>
                        <img 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                            />
                            {/* <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            /> */}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}