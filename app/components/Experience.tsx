"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

import fourX from "@/public/assets/4x-software.png";
import bootstrap from "@/public/assets/bootstrap.svg";
import bootstrapColored from "@/public/assets/bootstrap-colored.svg";
import css3 from "@/public/assets/css3.svg";
import css3Colored from "@/public/assets/css3-colored.svg";
import dart from "@/public/assets/dart.svg";
import dartColored from "@/public/assets/dart-colored.svg";
import datadog from "@/public/assets/datadog.svg";
import datadogColored from "@/public/assets/datadog-colored.svg";
import deriv from "@/public/assets/deriv.png";
import django from "@/public/assets/django.svg";
import djangoColored from "@/public/assets/django-colored.svg";
import docker from "@/public/assets/docker.svg";
import dockerColored from "@/public/assets/docker-colored.svg";
import figma from "@/public/assets/figma.svg";
import figmaColored from "@/public/assets/figma-colored.svg";
import firebase from "@/public/assets/firebase.svg";
import firebaseColored from "@/public/assets/firebase-colored.svg";
import flutter from "@/public/assets/flutter.svg";
import flutterColored from "@/public/assets/flutter-colored.svg";
import go from "@/public/assets/golang.svg";
import goColored from "@/public/assets/golang-colored.svg";
import html5 from "@/public/assets/html5.svg";
import html5Colored from "@/public/assets/html5-colored.svg";
import jarvis from "@/public/assets/jarvis-software-technology.png";
import javascript from "@/public/assets/javascript.svg";
import javascriptColored from "@/public/assets/javascript-colored.svg";
import jquery from "@/public/assets/jquery.svg";
import jqueryColored from "@/public/assets/jquery-colored.svg";
import materialUi from "@/public/assets/material-ui.svg";
import materialUiColored from "@/public/assets/material-ui-colored.svg";
import nodejs from "@/public/assets/nodejs.svg";
import nodejsColored from "@/public/assets/nodejs-colored.svg";
import perl from "@/public/assets/perl.svg";
import perlColored from "@/public/assets/perl-colored.svg";
import postgresql from "@/public/assets/postgresql.svg";
import postgresqlColored from "@/public/assets/postgresql-colored.svg";
import python from "@/public/assets/python.svg";
import pythonColored from "@/public/assets/python-colored.svg";
import react from "@/public/assets/react.svg";
import reactColored from "@/public/assets/react-colored.svg";
import redis from "@/public/assets/redis.svg";
import redisColored from "@/public/assets/redis-colored.svg";
import sass from "@/public/assets/sass.svg";
import sassColored from "@/public/assets/sass-colored.svg";
import selenium from "@/public/assets/selenium.svg";
import seleniumColored from "@/public/assets/selenium-colored.svg";
import typescript from "@/public/assets/typescript.svg";
import typescriptColored from "@/public/assets/typescript-colored.svg";

interface ImageAsset {
  src: StaticImageData | string;
  alt: string;
  onHover?: StaticImageData;
}

interface ExperienceCard extends ImageAsset {
  companyName: string;
  link: string;
  period: string;
  position: string;
  stackSrc: ImageAsset[]; // List of tech stacks used
}

function Experience() {
  const experience: ExperienceCard[] = [
    {
      src: fourX,
      alt: "4X Software",
      companyName: "4X Software Sdn. Bhd.",
      link: "https://4x.my/",
      period: "Aug 2023 - Present",
      position: "Back End Developer",
      stackSrc: [
        { src: perl, alt: "Perl", onHover: perlColored },
        { src: postgresql, alt: "PostgreSQL", onHover: postgresqlColored },
        { src: redis, alt: "Redis", onHover: redisColored },
        { src: html5, alt: "HTML5", onHover: html5Colored },
        { src: javascript, alt: "JavaScript", onHover: javascriptColored },
        { src: datadog, alt: "DataDog", onHover: datadogColored },
        { src: go, alt: "Go", onHover: goColored },
        { src: jquery, alt: "jQuery", onHover: jqueryColored },
        { src: docker, alt: "Docker", onHover: dockerColored },
      ],
    },
    {
      src: deriv,
      alt: "Deriv",
      companyName: "Deriv Services Sdn. Bhd.",
      link: "https://deriv.com/",
      period: "Mar 2023 - Jul 2023",
      position: "BeSquare Graduate Trainee",
      stackSrc: [
        { src: javascript, alt: "JavaScript", onHover: javascriptColored },
        { src: nodejs, alt: "Node.js", onHover: nodejsColored },
        { src: postgresql, alt: "PostgreSQL", onHover: postgresqlColored },
        { src: redis, alt: "Redis", onHover: redisColored },
        { src: docker, alt: "Docker", onHover: dockerColored },
        { src: dart, alt: "Dart", onHover: dartColored },
        { src: flutter, alt: "Flutter", onHover: flutterColored },
        { src: firebase, alt: "Firebase", onHover: firebaseColored },
        { src: react, alt: "React", onHover: reactColored },
        { src: materialUi, alt: "Material UI", onHover: materialUiColored },
        { src: html5, alt: "HTML5", onHover: html5Colored },
        { src: css3, alt: "CSS3", onHover: css3Colored },
        { src: sass, alt: "SASS", onHover: sassColored },
        { src: typescript, alt: "TypeScript", onHover: typescriptColored },
        { src: selenium, alt: "Selenium", onHover: seleniumColored },
        { src: figma, alt: "Figma", onHover: figmaColored },
      ],
    },
    {
      src: jarvis,
      alt: "Jarvis Software Technology",
      companyName: "Jarvis Software Technology Sdn. Bhd.",
      link: "https://www.facebook.com/Jarvisoftech/",
      period: "Oct 2022 - Dec 2022",
      position: "Software Engineer Intern",
      stackSrc: [
        { src: python, alt: "Python", onHover: pythonColored },
        { src: django, alt: "Django", onHover: djangoColored },
        { src: html5, alt: "HTML5", onHover: html5Colored },
        { src: bootstrap, alt: "Bootstrap", onHover: bootstrapColored },
      ],
    },
  ];

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center py-4">
          Experience
        </h1>
      </div>
      <div className="flex">
        <div className="container mx-auto p-4 space-y-4 max-w-3xl text-black">
          {experience.map((card, index) => (
            <div
              key={index}
              className="flex flex-row space-x-4 p-4 bg-gray-400 border-4 border-slate-800 rounded-xl items-center"
            >
              <div className="flex-none">
                <a href={card.link} target="_blank">
                  <Image
                    className="border border-slate-800 rounded-full"
                    src={card.src}
                    alt={card.alt}
                    width={75}
                    height={75}
                  />
                </a>
              </div>
              <div className="flex flex-col flex-grow justify-center gap-y-1">
                <div className="flex justify-between order-2 sm:order-1">
                  <a className="hidden sm:block" href={card.link}>
                    <p className="font-bold">{card.companyName}</p>
                  </a>
                  <p className="italic sm:not-italic">{card.period}</p>
                </div>
                <p className="order-1 sm:order-2 py-0 font-bold sm:italic sm:font-normal">
                  {card.position}
                </p>
                <div className="flex flex-row flex-wrap gap-x-1 sm:gap-x-2 order-3 space-y-1">
                  {card.stackSrc.map((stack, index) => (
                    <Image
                      key={index}
                      src={stack.src}
                      alt={stack.alt}
                      width={25}
                      height={25}
                      title={stack.alt}
                      onMouseEnter={(e) => {
                        if (stack.onHover) {
                          (e.currentTarget as HTMLImageElement).src =
                            stack.onHover.src;
                        }
                      }}
                      onMouseLeave={(e) => {
                        const originalSrc = stack.src as StaticImageData;
                        (e.currentTarget as HTMLImageElement).src =
                          originalSrc.src;
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Experience;
