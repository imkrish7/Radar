import React, { useRef, useEffect, useState } from "react";
import {
  forceSimulation,
  forceManyBody,
  forceLink,
  forceX,
  forceY,
  interpolateSpectral,
  scaleSequential  
} from "d3";

import { Skeleton, Typography } from "@mui/material";

import styles from "../styles/tooltip.module.css";

 const Tooltip = ({position})=>{
    const { domain, avatar, id: address } = position.data;
    return <div style={{
      position: "absolute",
      top: position.x + "px",
      left: position.y + "px",
      zIndex: 99
    }}
    className={styles.tooltip}
    >
      <div className={styles.imgWrapper}>
        { avatar && avatar.length > 0  ? <img className={styles.img} src={avatar} alt="avatr" /> : <Skeleton sx={{borderRadius: "4px"}} variant="reactangular" width={50} height={50} animation={"wave"}/> }
      </div>
      <Typography sx={{ width: "100%", wordBreak: "break-word", color: "#9b59b6", fontWeight: "bold", borderRadius: "50%" }} varaint="p">
        {address}
      </Typography>
      {domain && <Typography sx={{ width: "100%", wordBreak: "break-word", color: "#9b59b6", fontWeight: "bold", borderRadius: "50%" }} varaint="p">
        {domain}
      </Typography>}
      
    </div>
  }

const NetworkGraph = ({ nodes, source,links }) => {
  // console.log(links);
  const [animatedNodes, setAnimatedNodes] = useState([]);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    data: {}
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const node = useRef(null);
  const centerX = 480;
  const centerY = 400;
  let colorScale = scaleSequential(interpolateSpectral).domain([0,40])
  useEffect(
    () => {
      let simulation = null;
      if (nodes.length > 0) {
        simulation = forceSimulation(nodes)
        .force("x", forceX(centerX))
        .force("y", forceY(centerY))
        .force("charge", forceManyBody().strength(-3000))
        // .force("center", forceCenter([centerX, centerY]))
        .force("links", forceLink(links));
        // console.log(simulation);
        simulation.on("tick", () => {
          setAnimatedNodes([...simulation.nodes()]);
        });
        simulation.nodes([...nodes]);
        simulation.alpha(0.9).restart();
      }
      return () => simulation?.stop();
    },
    [nodes, links]
  );  

 

  return (
    <React.Fragment>
      {showTooltip && <Tooltip {...{position}} />}
    <svg id="graph" width="960" height="800" ref={node}>
      <g>
        {
            animatedNodes.length > 0 && links.length > 0 && links.map((link, index)=>{
              return <line markerEnd="#arrow" key={index} opacity={0.9} x1={link.source.x} y1={link.source.y} x2={link.target.x}  y2={link.target.y} stroke="#a29bfe" strokeWidth={4} />
            })
          } 
        {animatedNodes.length > 0 &&
          animatedNodes.map((node, link) => {
            // console.log(node);
            return (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.id === source ? 50 : 10}
                key={node.id}
                stroke="transparent"
                fill={colorScale(node.index)}
                opacity={node.id === source ? 1:1}
                strokeWidth={3}
                onMouseOver={(event)=>{
                  const { clientX, clientY } = event;
                  setPosition({
                    x: clientX + 10,
                    y: clientY + 10,
                    data: {...node}
                  })
                  setShowTooltip(true)
                }}
                onMouseLeave={(event)=>{
                  setPosition({
                    x:0,
                    y: 0,
                    data: {}
                  })
                  setShowTooltip(false)
                }}
              />
            );
          })}
      </g>
    </svg>
    </React.Fragment>
  );
};

export default NetworkGraph;
