import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

export default function UserCard(props) {


  
  return (
    <Card className={props.className} style={{color: '#212529'}}>
    
      <CardHeader>{props.user.name}</CardHeader>
      <CardImg src={props.user.avatar_url} style={{    maxWidth: '350px',
    maxHeight: '350px',
    borderRadius: '3px'
  }}/>
      <CardBody>
        <CardTitle>{props.user.login}</CardTitle>
        <p>{props.user.bio}</p>
        <Button outline href={props.user.html_url}>See Profile</Button>
      </CardBody>
      <CardFooter>Followers:{props.user.followers}</CardFooter>      

    </Card>
  );
}

export  function UserCards(props) {
  return (
    <Card className={props.className} style={{color: '#212529'}} id={`li-${props.user.id}`}>
      {/*<CardHeader>{props.user.name}</CardHeader>*/}
      <CardImg src={props.user.avatar_url} id={props.id} style={{
    borderRadius: '3px'
  }}/>
{/*      <CardBody>
        <CardTitle>{props.user.login}</CardTitle>
        <p>{props.user.bio}</p>
        <Button outline href={props.user.html_url}>See Profile</Button>
      </CardBody>
      <CardFooter>Followers:{props.user.followers}</CardFooter>   */}   
    </Card>
  );
}