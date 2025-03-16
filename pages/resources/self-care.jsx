import Header from "../../components/header"
import Footer from "../../components/footer"
import Head from "next/head"
import { useRouter } from 'next/router'
import Image from "next/image"
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from '../../config/session'

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        const user = req.session.user
        const props = {}
        if (user) {
            props.user = req.session.user
            props.isLoggedIn = true
        } else {
            props.isLoggedIn = false
        }
        return { props }
    },
    sessionOptions
)

export default function Self(props) {
    const router = useRouter()

    return (
        <div>
            <Head>
                <title>Self-Care Resources</title>
            </Head>

            <Header 
                isLoggedIn={props.isLoggedIn}
            />
            <main>
                <h1>Self-Care Resources</h1>
                <section>
                    <h2>Importance of Self-Care</h2>
                    <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste dolor voluptates ut optio quasi. Totam minima eveniet modi enim blanditiis reiciendis, impedit, itaque reprehenderit omnis quaerat assumenda iure, libero asperiores.</h4>
                </section>
                {/* Resources */}
                <section> 
                    <div>
                    <a href="#">
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
                        </a>
                        <a href="#">
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
                        </a>
                        <a href="#">
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
                        </a>
                        <a href="#">
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
                        </a>
                        <a href="#">
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
                        </a>
                        <a href="#">
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
                        </a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}