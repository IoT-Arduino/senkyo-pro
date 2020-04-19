import React from 'react';
import { Link } from 'gatsby'

const Topics = ({topics}) => {

    return (
        <>
        <div className="my-8 mb-30">
            <div className="mt-10 mb-2 mx-2">
                {topics.length>0 ? <h3>選挙区Topics</h3> : 
                    <div>
                    <h3>選挙区Topics</h3><p>(ここに、選挙区の記事が表示されます)</p>
                    </div>
                }
            </div>

            {topics.map(({ node }) => (
                <div key={node.fields.slug} className="mx-4 my-2">
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
