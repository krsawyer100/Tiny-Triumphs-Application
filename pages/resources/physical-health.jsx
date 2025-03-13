import Header from "../../components/header"
import Footer from "../../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function Physical() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Physical Health Resources</title>
            </Head>

            <Header />
            <main>
                <h1>Physical Health Resources</h1>
                <section>
                    <h2>911 Contact</h2>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi rerum et quia non doloribus ea dolorem eius explicabo, magnam eum cumque similique ducimus! Maiores officia modi earum similique quae odio.</p>
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi accusamus corporis, culpa illum praesentium eum exercitationem magni esse accusantium a nesciunt nisi saepe ducimus fuga amet enim? Eius, voluptatibus perspiciatis!</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deserunt nam amet iste esse assumenda nobis tempore nemo ad voluptatum magni commodi quia culpa, ratione numquam omnis ipsum repudiandae quidem!</p>
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
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit error illo ab nemo earum voluptatibus inventore mollitia neque, consectetur eos deserunt est facere aliquam amet optio a! Mollitia, dolorem maxime?</p>
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
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus at ducimus, eos amet nemo facere doloremque maxime quibusdam nulla, expedita soluta impedit corrupti placeat ab in eveniet quaerat veritatis dolores!</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt id ab qui obcaecati aut dolor sit modi vel voluptas blanditiis, porro quidem amet nemo tempore quisquam error maiores accusamus iure.</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}