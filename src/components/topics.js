import React from 'react';
import { Link } from 'gatsby'

const Topics = ({topics}) => {

    return (
        <>
        <div>
            <div className="mt-8">
                {topics.length>0 ? <h3>選挙区Topics</h3> : <p> </p>}
            </div>

            {topics.map(({ node }) => (
                <div key={node.fields.slug}>
                    <h3>
                    <Link to={`/posts/${node.fields.slug}`}>
                      {node.frontmatter.title}</Link>
                      <span style={{ color:'#bbb'}}> - {node.frontmatter.date}</span>
                    </h3>
                    <p>{node.excerpt}</p>
                </div>
                ))}
    

        </div>
        </>
    );
}

export default Topics;
