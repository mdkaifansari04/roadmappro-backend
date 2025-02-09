import { NextFunction, Request, Response } from 'express';
import ErrorResponse from 'helper/errorResponse';
import { CustomRequest } from 'types';

export const generateRoadmap = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { topic, skillLevel, duration } = req.value;
    console.log('check 1');

    const response = await getRoadmap(topic, skillLevel, duration);
    console.log(response);

    res.status(200).json({ success: true, roadmap: response });
  } catch (error) {
    next(new ErrorResponse(`Internal server error : ${error}`, 500));
  }
};

const getRoadmap = async (topic: string, skillLevel: string, duration = 30) => {
  try {
    const prompt = `
      You are an AI mentor. Generate a ${duration}-day roadmap for learning ${topic} at a ${skillLevel} level.
      Break it into daily tasks. Each day should have:
      - Learning objective
      - Estimated time
      - Required prerequisites
      - Video topic suggestion
      - Quiz/Assignment ideas
  `;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'deepseek-r1:1.5b',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error : ', error);
  }
};
