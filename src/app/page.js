'use client';
import styles from './page.module.scss';
import Category from '@/components/Category';
import { useEffect, useState, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'locale':
      return { ...state, locale: action.payload };
    case 'usualMale':
      return { ...state, usualMale: action.payload };
    case 'unusualMale':
      return { ...state, unusualMale: action.payload };
    case 'usualFemale':
      return { ...state, usualFemale: action.payload };
    case 'unusualFemale':
      return { ...state, unusualFemale: action.payload };
    case 'obstacles':
      return { ...state, obstacles: action.payload };
    case 'problems':
      return { ...state, problems: action.payload };
    case 'crises':
      return { ...state, crises: action.payload };
    case 'predicaments':
      return { ...state, predicaments: action.payload };
    case 'climax':
      return { ...state, climax: action.payload };
    default:
      return state;
  }
};

const initStorySchema = {
  locale: '',
  usualMale: '',
  usualFemale: '',
  unusualMale: '',
  unusualFemale: '',
  obstacles: '',
  problems: '',
  crises: '',
  predicaments: '',
  climax: ''
};

const categories = ['locale', 'usualMale', 'usualFemale', 'unusualMale', 'unusualFemale', 'obstacles', 'problems', 'crises', 'predicaments', 'climax'];
const categoryTitles = ['Locale', 'Usual Male', 'Usual Female', 'Unusual Male', 'Unusual Female', 'Obstacles', 'Problems', 'Crises', 'Predicaments', 'Climax'];

export default function Home() {
  const [story, setStory] = useState('Story goes here');
  const [state, dispatch] = useReducer(reducer, initStorySchema);

  const [categoryPointer, setCategoryPointer] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(null);

  console.log('PAGE');
  /* Init with first category */
  useEffect(
    _ => {
      fetchCSVData(categories[categoryPointer]);
    },
    [fetchCSVData]
  );

  useEffect(
    _ => {
      fetchCSVData(categories[categoryPointer]);
    },
    [categoryPointer, fetchCSVData]
  );

  /* Fetch CSV data */
  const fetchCSVData = async file => {
    if (!file) return;

    try {
      const response = await fetch(`/api/csv?file=${file}`);
      setCurrentCategory(<Category title={file} data={await response.json()} handler={handleChoiceSelected} />);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  /* Update story parameters */
  const handleChoiceSelected = item => {
    setCategoryPointer(p => p + 1);
    dispatch({ type: item.type, payload: item.payload });
  };

  /* Get Story from API call */
  const handleSubmit = async e => {
    e.preventDefault();
    setCategoryPointer(p => 0);

    const response = await fetch(`api/`, {
      method: 'POST',
      body: JSON.stringify(state),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const body = await response.text();
    setStory(c => <span>{body}</span>);
  };

  const displayChoices = (
    <p>
      {state['locale'] && `Locale: ${state['locale']}`}
      <br />
      {state['usualMale'] && `Usual Male: ${state['usualMale']}`}
      <br />
      {`Usual Female: ${state['usualFemale']}`}
      <br />
      {`Unusual Male: ${state['unusualMale']}`}
      <br />
      {`Unusual Female: ${state['unusualFemale']}`}
      <br />
      {`Problems: ${state['problems']}`}
      <br />
      {`Crises: ${state['crises']}`}
      <br />
      {`Predicaments: ${state['predicaments']}`}
      <br />
      {`Surprises: ${state['climax']}`}
      <br />
      <br />
    </p>
  );

  return (
    <section className={styles['section']}>
      <div className={styles['section__title']}>Generate a story using Plot Genie's schema and GPT-3. Select a prompt to Generate a story.</div>
      <span className={styles['section__ul-title']}>{categoryTitles[categoryPointer]}</span>
      {currentCategory ? currentCategory : <span>Loading...</span>}
      <button type='submit' onSubmit={handleSubmit} onClick={handleSubmit}>
        Generate Story
      </button>
      {displayChoices}
      <span>{story}</span>
    </section>
  );
}
