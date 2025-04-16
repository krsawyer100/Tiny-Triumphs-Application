import styles from "./style.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ResourceLink({ resourceURL, resourceImgURL, resourceTitle, resourceDescription }) {
    return (
            <Link href={resourceURL} target="_BLANK" className={styles.resourceLink}>
                <Image
                    src={resourceImgURL}
                    alt=""
                    width={300}
                    height={250}
                    className={styles.resourceImg}
                />
                <div className={styles.resourceTextContainer}>
                    <h3>{resourceTitle}</h3>
                    <p>{resourceDescription}</p>
                </div>
            </Link>
    )
}