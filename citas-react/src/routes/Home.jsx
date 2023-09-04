import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Container, Box } from "@mui/material";
import Example from "../components/Tappbar";
import { useNavigate } from "react-router"

const Home = () => {
    const navigate = useNavigate()
    
    const handleClick = () => {
      navigate("/odonto")
    }
    const handle = ()=>{
        navigate("/lavadero")
    }
  return (
    <>
      <Example></Example>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="80"
                image="https://i.pinimg.com/originals/24/83/79/248379dcb515920751f3a2618883835c.png"
                alt="odontologia"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Alteza Odontologia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color='primary'onClick={handleClick}>
                Agendar Turno 
              </Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100"
                image="https://i.pinimg.com/originals/0b/09/c6/0b09c6af040dbae0754aab9e1ed62426.png"
                alt="odontologia"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  VIP PCC Car Wash
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color='primary' onClick={handle}>
                Agendar Turno 
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Container>
    </>
  )
}

export default Home;
