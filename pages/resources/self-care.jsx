import Header from "../../components/header"
import Footer from "../../components/footer"
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
                            <h3>Resource</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla repellendus labore saepe pariatur repellat, eius incidunt ex nesciunt, consequatur doloribus quae praesentium, vitae consectetur tenetur commodi quasi beatae. Ipsum, voluptates!</p>
                        </div>
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
                            <h3>Resource</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repudiandae doloribus recusandae minima reiciendis veniam magni ipsum aspernatur. Eligendi ullam modi laborum exercitationem facilis voluptas aliquid a nulla ab sed.</p>
                        </div>
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
                            <h3>Resource</h3>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat officiis accusamus doloremque, quis voluptates vitae dolorum vel. Sequi temporibus architecto quis hic quisquam aliquid laborum perferendis. Optio debitis enim voluptates.</p>
                        </div>
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
                            <h3>Resource</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam explicabo reiciendis delectus asperiores eos id omnis laboriosam magnam, sunt vel vero deleniti laudantium ab nesciunt quo perspiciatis tenetur, architecto aliquid!</p>
                        </div>
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
                            <h3>Resource</h3>
                            <p></p>
                        </div>
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
                            <h3>Resource</h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta libero numquam voluptas veritatis sint facere placeat voluptatibus illum quibusdam hic ab, atque quae magni at, dolorum incidunt modi accusantium ad.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}