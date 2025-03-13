import { Header, Footer } from "../components"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function Self() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Self-Care Resources</title>
            </Head>

            <Header />
            <main>
                <h1>Self-Care Resources</h1>
                <section>
                    <h2>Importance of Self-Care</h2>
                    <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste dolor voluptates ut optio quasi. Totam minima eveniet modi enim blanditiis reiciendis, impedit, itaque reprehenderit omnis quaerat assumenda iure, libero asperiores.</h4>
                </section>
                {/* Resources */}
                <section> 
                    <div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                        <div>
                            <Image 
                                src="https://picsum.photos/200/300"
                                alt="Placeholder"
                                width={300}
                                height={200}
                            />
                            <h3>Resource</h3>
                            <p></p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}