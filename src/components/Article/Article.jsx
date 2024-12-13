import React from "react";
import './Article.css';

const Article = ({
    children
}) => {
    return (
        <article>
            {children}
        </article>
    )
}

export default Article;