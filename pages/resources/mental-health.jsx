import Header from "../../components/header"
import Footer from "../../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"

export default function Mental() {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Mental Health Resources</title>
            </Head>

            <Header />
            <main>
                <h1>Mental Health Resources</h1>
                <section>
                    <h2>Mental Health Crisis Help Line</h2>
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
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi alias sapiente, iste pariatur esse voluptatem quisquam nesciunt, tempora voluptate animi, est voluptas consequatur in assumenda! Labore quaerat accusantium vel a.</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ratione illum maiores dicta commodi, tempora velit eaque obcaecati incidunt repellat accusantium magni, doloribus facere assumenda. Eaque nesciunt dicta ratione quod.</p>
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
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad eligendi eius cumque ullam dicta odit! Molestiae asperiores repudiandae nemo ipsa in magni nesciunt sequi minus, repellendus enim sapiente iusto fugiat.</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsum optio, perferendis odit id sapiente natus, esse, dolore dicta ad totam. Ipsam perferendis facere sequi dignissimos repellat nulla minima voluptate?</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, accusantium possimus. Fugiat aut esse incidunt totam vel veritatis odio nam, omnis vitae consequuntur ea adipisci aliquid, deleniti quidem dignissimos ullam.</p>
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
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui porro nemo possimus alias assumenda expedita? Id, odit cum aperiam, dolor voluptatum quasi accusantium voluptate, temporibus molestias consequatur labore distinctio amet?</p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}