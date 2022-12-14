import { Component, For } from 'solid-js';
import { createResource, Show } from 'solid-js';

import styles from './projectCard.module.css';

type ProjectCardProps = {
  user: string;
  repo: string;
};

type RepoData = {
  full_name: string;
  html_url: string;
  topics: string[];
  watchers_count: number;
  language: string;
  description: string;
};

const ProjectCard: Component<ProjectCardProps> = ({
  user,
  repo,
}: ProjectCardProps) => {
  const [repoData, _] = createResource<RepoData>(async () => {
    try {
      const url = `https://api.github.com/repos/${user}/${repo}`;

      const response = await fetch(url);

      return response.json();
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  });
  return (
    <Show when={repoData()}>
      <div
        class={styles.card}
        onClick={() => {
          window.location.href = repoData()?.html_url!;
        }}>
        <span class={styles.language}>
          {repoData()?.language?.toUpperCase()}
          <div class={styles.watchers}>
            <svg
              aria-hidden='true'
              height='16'
              viewBox='0 0 16 16'
              version='1.1'
              width='16'
              data-view-component='true'
              fill='white'
              class='octicon octicon-star d-inline-block mr-2'>
              <path
                fill-rule='evenodd'
                d='M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z'></path>
            </svg>
            {repoData()?.watchers_count}
          </div>
        </span>
        <span class={styles.name}>{repoData()?.full_name}</span>
        <div class={styles.description}>
          <p>{repoData()?.description}</p>
        </div>
        <div class={styles.topics}>
          <For each={repoData()?.topics}>
            {(topic) => <div class={styles.topicPill}>{topic}</div>}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default ProjectCard;
