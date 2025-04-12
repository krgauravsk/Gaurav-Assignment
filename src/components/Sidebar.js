import React, { useState, useRef, useEffect } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getComponent } from "./getComponents";
import {
  motionComponents,
  looksComponents,
  controlComponents,
  eventsComponents,
} from "./SidebarConstants";

export default function Sidebar() {
  const [activeCategory, setActiveCategory] = useState("motion");

  const motionRef = useRef(null);
  const looksRef = useRef(null);
  const controlRef = useRef(null);
  const eventsRef = useRef(null);
  const containerRef = useRef(null);

  
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: motionRef, name: "motion" },
        { ref: looksRef, name: "looks" },
        { ref: controlRef, name: "control" },
        { ref: eventsRef, name: "events" },
      ];

      const scrollY = containerRef.current.scrollTop;

      const offsets = sections.map((sec) => ({
        name: sec.name,
        offset: sec.ref.current.offsetTop,
      }));

      const visible = offsets
        .reverse()
        .find((sec) => scrollY + 100 >= sec.offset); 

      if (visible) setActiveCategory(visible.name);
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToSection = (name) => {
    const refMap = {
      motion: motionRef,
      looks: looksRef,
      control: controlRef,
      events: eventsRef,
    };
    refMap[name]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex h-full">
      {/* Sidebar Menu */}
      <div
        className="flex flex-col gap-4 p-2"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: '70px',
          border: "1px solid #ced4da",
          borderLeft: "transparent",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        {[
          { name: "motion", color: "bg-blue-500", active: "bg-blue-300 p-2" },
          { name: "looks", color: "bg-purple-500", active: "bg-blue-300  p-2" },
          { name: "control", color: "bg-red-400", active: "bg-blue-300  p-2" },
          { name: "events", color: "bg-yellow-400", active: "bg-blue-300  p-2" },
        ].map((item) => (
          <div
            key={item.name}
            className={`flex flex-col items-center gap-2 cursor-pointer ${
              activeCategory === item.name ? item.active : ""
            }`}
            onClick={() => scrollToSection(item.name)}
          >
            <span className={`h-6 w-6 rounded-full ${item.color}`}></span>
            <span className="capitalize text-xs">{item.name}</span>
          </div>
        ))}
      </div>

      {/* Scrollable Component Area */}
      <div
        className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200"
        ref={containerRef}
      >
        <div className="font-bold mb-5 text-center border border-2 rounded text-white bg-green-400 p-2 w-auto">
          Side Bar
        </div>

        {/* Motion Section */}
        <div ref={motionRef} className="font-bold">
          Motion
        </div>
        <Droppable droppableId="sideArea-motion" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-motion my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {motionComponents.map((x, i) => (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* Looks Section */}
        <div ref={looksRef} className="font-bold">
          Looks
        </div>
        <Droppable droppableId="sideArea-looks" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-looks my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {looksComponents.map((x, i) => (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* Control Section */}
        <div ref={controlRef} className="font-bold">
          Control
        </div>
        <Droppable droppableId="sideArea-control" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-control my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {controlComponents.map((x, i) => (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>

        {/* Events Section */}
        <div ref={eventsRef} className="font-bold">
          Events
        </div>
        <Droppable droppableId="sideArea-events" type="COMPONENTS">
          {(provided) => (
            <ul
              className="sideArea-events my-3"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {eventsComponents.map((x, i) => (
                <Draggable
                  key={`${x}-sideArea`}
                  draggableId={`${x}-sideArea`}
                  index={i}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="my-2"
                    >
                      {getComponent(x)}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
}
