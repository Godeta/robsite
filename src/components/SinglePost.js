import React, {useEffect, useState} from 'react';
import {useParams } from "react-router-dom";
import sanityClient from '../client.js';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

// permet d'avoir une image adaptée plutôt clean selon ce que l'on a choisi sur sanity
// on peut facilement manipuler les images une fois dans l'objet urlFor en ajout .blur, .width etc.
const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
    return builder.image(source);
}

export default function SinglePost() {
    const [singlePost, setSinglePost] = useState(null);
    const {slug } = useParams();

    useEffect(()=> {
        // name -> un alias comme dans sql qui correspond à une colonne (ici auteur.nom, ça évite de remettre tout l'objet)
        sanityClient.fetch(`*[slug.current == "${slug}"] {
            title,
            _id,
            slug,
            mainImage {
                asset -> {
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
        }`).then((data) => setSinglePost(data[0])).catch(console.error);
    }, [slug]);
    // si jamais il n'y a pas de post, on affiche chargement
    if(!singlePost) return <div> En cours de chargement...</div>;
    return (
        <main className="bg-gray-200 min-h-screen p-12">
            <article className="container shadow-lg mx-auto bg-green-100 rounded-lg">
                <header className="relative">
                    <div className="absolute w-full h-full flex items-center justify-center p-8"> 
                        <div className=" bg-white bg-opacity-75 rounded p-12" >
                            <h1 className=" cursive text-3xl lg:text-6xl mb-4"> {singlePost.title} </h1>
                            <div className="flex justify-center text-gray-800"> <img src={urlFor(singlePost.authorImage).url()} 
                                alt={singlePost.name} className= "w-10 h-10 rounded-full" /> 
                                <p className="cursive flex items-center pl-2 text-2xl"> {singlePost.name} </p>
                                </div>
                            </div>
                        </div>
                        {/* ici on récupère l'image directement plutôt que d'utiliser urlFor mais 
                        les 2 sont possibles et urlFor pourrait permettre d'ajouter des effets */}
                        <img src={singlePost.mainImage.asset.url} alt={singlePost.title} className="w-full object-cover rounded-t" style= {{ height:"400px"}}/>
                </header>
                <div className="px-16 lg:px-48 py-12 lg:py-20 prose lg:prose-xl max-w-full"> 
                 <BlockContent blocks={singlePost.body} projectId="48fh369m" dataset="production" />
                </div>
            </article>
        </main>
    )
}