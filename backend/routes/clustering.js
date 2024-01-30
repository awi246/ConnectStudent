const express = require("express");
const router = express.Router();
const questionDB = require("../models/Question");

router.get("/cluster", async (req, res) => {
  try {
    const questions = await questionDB.find();

    const features = questions.map((question) => [
      question.length,
      question.votes.upvote,
      question.votes.downvote,
    ]);

    const k = 3;

    const clusters = kMeansClustering(features, k);

    clusters.forEach((cluster, index) => {
      questions[index].cluster = cluster;
    });

    questions.forEach(async (question) => {
      await questionDB.findByIdAndUpdate(question._id, {
        $set: { cluster: question.cluster },
      });
    });

    res
      .status(200)
      .json({ status: true, message: "Clustering successful", clusters });
  } catch (error) {
    console.error("Error during clustering:", error);
    res.status(500).json({ status: false, message: "Internal Server Error" });
  }
});

function kMeansClustering(features, k) {
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
      clusters[closestCluster].push(pointIndex);
    });

    centroids = clusters.map((cluster) => calculateMean(features, cluster));

    iterations++;
  }

  return clusters;
}
function euclideanDistance(point1, point2) {
  return Math.sqrt(
    point1.reduce((sum, value, index) => sum + (value - point2[index]) ** 2, 0)
  );
}

function calculateMean(features, cluster) {
  const clusterPoints = cluster.map((index) => features[index]);

  if (clusterPoints.length === 0) {
    return features[0];
  }

  const mean = clusterPoints[0].map(
    (_, i) =>
      clusterPoints.reduce((sum, point) => sum + point[i], 0) /
      clusterPoints.length
  );

  return mean;
}

module.exports = router;
