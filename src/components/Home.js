import React from 'react';
import image from "../img/roboticsHelpHuman.jpg";

export default function Home() {
    return (
        <main>
            <img src={image} alt="robot and human shaking hand " className="absolute object-cover w-full h-full"/>
            <section className="relative flex justify-center min-h-screen pt-12 lg:pt-64 px-8">
                <h1 className="text-6xl text-blue-200 font-bold cursive leading-none lg:leading-snug home-name"> Bienvenu sur le Robsite.</h1>
            </section>
        </main>
    )
}