import React, { useRef, useEffect } from 'react';
import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';
import '../index.css';

import caseStudies from '../videos/select-case-studies.mp4';
import { setup } from '../components/video-renderer';
import init from '../webgl';

const IndexPage = () => {
  const videoRef = useRef(null);
  const mountRef = useRef(null);
  // webgl
  useEffect(() => {
    // const video = videoRef.current;
    init(videoRef.current);
    // effect
    return () => {
      // cleanup
    };
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <div className="container" ref={mountRef}>
        <canvas id="video" ref={videoRef}></canvas>
        <Image />
      </div>
    </Layout>
  );
};

export default IndexPage;
