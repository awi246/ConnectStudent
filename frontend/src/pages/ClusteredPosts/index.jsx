/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const mockQuestions = [
  {
    id: 1,
    content: "What is advanced java?",
    length: 16,
    votes: { upvote: 10, downvote: 2 },
  },
  {
    id: 2,
    content: "What is DWDM?",
    length: 10,
    votes: { upvote: 15, downvote: 3 },
  },
  {
    id: 3,
    content: "What are the different steps of Project Planning?",
    length: 22,
    votes: { upvote: 20, downvote: 5 },
  },
  {
    id: 4,
    content: "Explain the different skills required for the managers",
    length: 30,
    votes: { upvote: 18, downvote: 4 },
  },
  {
    id: 5,
    content: "How to optimize database queries?",
    length: 28,
    votes: { upvote: 25, downvote: 6 },
  },
  {
    id: 6,
    content: "Define public key certificate?",
    length: 35,
    votes: { upvote: 22, downvote: 8 },
  },
];

const ContentClustering = () => {
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    clusterContent();
  }, []);

  const clusterContent = () => {
    const features = mockQuestions.map((question) => [
      question.length,
      question.votes.upvote,
      question.votes.downvote,
    ]);

    const k = 2;

    const clusteredData = kMeansClustering(features, k);

    setClusters(clusteredData);
  };

  const euclideanDistance = (point1, point2) => {
    return Math.sqrt(
      point1.reduce(
        (sum, value, index) => sum + Math.pow(value - point2[index], 2),
        0
      )
    );
  };

  const calculateMean = (features, cluster) => {
    const clusterPoints = cluster.map((question) => [
      question.length,
      question.votes.upvote,
      question.votes.downvote,
    ]);

    if (clusterPoints.length === 0) {
      return features[0];
    }

    const mean = clusterPoints[0].map(
      (_, i) =>
        clusterPoints.reduce((sum, point) => sum + point[i], 0) /
        clusterPoints.length
    );

    return mean;
  };

  const kMeansClustering = (features, k) => {
    let centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push(features[Math.floor(Math.random() * features.length)]);
    }

    let iterations = 0;
    const maxIterations = 100;

    while (iterations < maxIterations) {
      const clusters = Array.from({ length: k }, () => []);

      features.forEach((point, pointIndex) => {
        const distances = centroids.map((centroid) =>
          euclideanDistance(point, centroid)
        );
        const closestCluster = distances.indexOf(Math.min(...distances));
        clusters[closestCluster].push({
          ...mockQuestions[pointIndex],
          cluster: closestCluster,
        });
      });

      centroids = clusters.map((cluster) => calculateMean(features, cluster));

      iterations++;
    }

    return clusters;
  };

  return (
    <div>
      <h2>Content Clustering</h2>
      {clusters.map((cluster, index) => (
        <div key={index}>
          <h3>Cluster {index + 1}</h3>
          <ul>
            {cluster.map((question) => (
              <li key={question.id}>
                <strong>Question:</strong> {question.content} |{" "}
                <strong>Cluster:</strong> {question.cluster}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ContentClustering;
