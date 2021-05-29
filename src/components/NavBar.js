import React from 'react';
import {NavLink} from "react-router-dom";
import {SocialIcon} from "react-social-icons";

/**
 * Toute la barre de navigation qui apparait au début de chaque pages.
 * On met nos éléments html, className="" pour ajouter des classes et on peut mettre des éléments importés de react comme <NavLink>
 * activeClassName pour que quand on est sur la page de l'élement correspondant, appliqué un style particulier
 * @returns 
 */
export default function NavBar() {
    return (
        <header className="bg-gray-600 nav">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink to="/" 
                    exact 
                    activeClassName="text-white"
                    className="inflex-flex items-center py-6 px-3 mr-4 text-red-100 hover:text-gray-100 text-4xl font-bold cursive tracking-widest"
                    >
                        Accueil
                    </NavLink>
                    <NavLink to="/post"
                    className="inflex-flex items-center py-3 px-3 my-6 text-red-200 hover:text-gray-100"
                    activeClassName="text-red-100 bg-gray-800"
                    >
                        Blog Posts
                    </NavLink>
                    <NavLink to="/project" 
                    className="inflex-flex items-center py-3 px-3 my-6 text-red-200 hover:text-gray-100"
                    activeClassName="text-red-100 bg-gray-800"
                    >
                        Projets
                    </NavLink>
                    <NavLink to="/about"
                    className="inflex-flex items-center py-3 px-3 my-6 text-red-200 hover:text-gray-100"
                    activeClassName="text-red-100 bg-gray-800"
                    >
                        A propos de moi
                    </NavLink>
                </nav>
                <div className="inline-flex py-3 px-3 my-6">
                    <SocialIcon url="https://github.com/Godeta" className="mr-4" target="_blank" fgColor="#fff" style={{height:35, width:35}}/>
                    <SocialIcon url="https://www.linkedin.com/in/arnaud-godet-b633021a6/" className="mr-4" target="_blank" fgColor="#fff" style={{height:35, width:35}}/>
                    <SocialIcon url="mailto:ag.arnaudgodet@gmail.com" className="mr-4" target="_blank" fgColor="#fff" style={{height:35, width:35}}/>
                </div>
            </div>
        </header>
    )
}