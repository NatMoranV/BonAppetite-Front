import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Form () {
   
  let params  = useParams()

  const [ qualification , setQualification ] = useState ([])
  

  //traigo los datos del pedido 

  const  order =  async () => {
        let {orderId} = params
        const { data }  = await axios.get(`https://resto-p4fa.onrender.com/order/103`)
        .catch ((error) => alert (error))
        
              
        const qualis = data.OrderDetails.map((elem)  => {
            return {
                name: elem.Product.description,
                id: elem.id,
                stars: 0,
            }
        })
        setQualification(qualis)
    } 
   
  const handleChange = (e) => {
                const nameinput = e.target.name;
                const valueinput = e.target.value;
                const nuevoEstado = qualification.map ( objeto =>
                    { if ((objeto.name) == nameinput) {
                           objeto.stars = valueinput
                       }
                      return objeto
                    })
                    
                 setQualification(nuevoEstado)
           
    }
          
   const handleSubmit = async (event) => {
        event.preventDefault()
        const arrQualification = qualification.map ((elem) => {
        return {
            idProduct: elem.id , points: Number(elem.stars)
        }})
        const respuesta =  { arrQualification : arrQualification}      
        console.log(respuesta);
        // await axios.post(`http://localhost:3001/qualification/        `,respuesta)
        // .then((response) => alert('formulario enviado con exito'))
        // .catch ((error) => alert (error))
   }
    

  useEffect(() => {
        order()
    }, [params, setQualification])
   
   

   return (
        <div > 
            <div>
                <h2>Califica tu pedido!</h2>
                <h6>Para seguir mejorando, te pedimos por favor que nos digas como estuvo</h6>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                {qualification.map((elem) => {
                    return ( 
                        <div key={elem.id} style={ { display: 'flex', flexDirection: 'row'}}>
                            <p>{elem.name} :</p>
                            <label htmlFor='i'></label>
                            <input 
                                name={elem.name} 
                                value={elem.stars} 
                                onChange={(e)=>handleChange(e)}
                                type='number'
                                max={5}
                                min={1}
                            />
                        </div>
                    )}
                )}
                 
                 <button >enviar</button>
            </form>
        </div>   
    )
}


