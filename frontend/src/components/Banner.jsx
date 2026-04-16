import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../css/Banner.css';

export default function Banner(){
    return(
        <>
        <Carousel>
          <Carousel.Item>
          {/* // d-block a imagem fica como um bloco e o w-100 para a ocupar toda a largura do container */}
          {/* //site que gera imagens de placeholder apenas temporario */}
            <img
              className="d-block w-100" 
              src="https://placehold.co/1200x400?text=Produto+1"
              alt="Primeiro slide"
            />
            <Carousel.Caption>
              <h3>Para os rapazes</h3>
              <p>Confira nossas opções para os garotos</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://placehold.co/1200x400?text=Produto+2"
              alt="Segundo slide"
            />
            <Carousel.Caption>
              <h3>Para as moças</h3>
              <p>Looks incríveis para elas</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://placehold.co/1200x400?text=Produto+3"
              alt="Terceiro slide"
            />
            <Carousel.Caption>                                                                  
              <h3>Nossos calçados</h3>
              <p>Conforto e estilo para os pés</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
         <ButtonGroup className='d-flex justify-content-center my-3'>    
         <Button className="btn-loja-carrossel">Masculino</Button>
         <Button className="btn-loja-carrossel">Feminino</Button>
         <Button className="btn-loja-carrossel">Calçados</Button>
       </ButtonGroup>
       </>
    )
}