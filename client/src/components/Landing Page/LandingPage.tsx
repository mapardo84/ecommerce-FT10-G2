import React from 'react';
import {Layout, Space, Button} from 'antd';
import {Link} from 'react-router-dom'

export function LandingPage(props: {children:any}){
    return <Layout>
        <Layout.Header>

        </Layout.Header>
        <Layout.Content >
        <div >
        
            <div >
                <div >
                    <h2 >LIFE IS SHORT AND THE WORLD IS <span >WIDE</span></h2>
                    <p >” The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.”</p>
                    
                 <Link to= "/home">
                 <button  >Learn More</button>  
            </Link>
            </div> 
            
            </div> 
            </div>
            
        </Layout.Content>
        <Layout.Footer>

        </Layout.Footer>
    </Layout>
}