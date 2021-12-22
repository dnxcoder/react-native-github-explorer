import React from "react";
import { useRoute } from "@react-navigation/core";
import { Linking } from "react-native";
import { useRepositories } from "../../hooks/useRepositories";

import { Background } from "../../components/Background";
import { Card } from "../../components/Card";

import {
  Container,
  RepoInfo,
  OwnerAvatar,
  TextGroup,
  Description,
  RepoStats,
  Stars,
  StarsCounter,
  StarsText,
  Forks,
  ForksCounter,
  ForksText,
  OpenIssues,
  OpenIssuesCounter,
  OpenIssuesText,
  IssuesList,
} from "./styles";
import { TitleAnimation } from "./TitleAnimation";

interface RepositoryParams {
  repositoryId: number;
}

export function Repository() {
  const { params } = useRoute();
  const { repositoryId } = params as RepositoryParams;
  const { findRepositoryById } = useRepositories();
  const repository = findRepositoryById(repositoryId);
  const {
    id,
    full_name,
    owner,
    description,
    stargazers_count,
    forks_count,
    open_issues_count,
    issues_url,
    issues,
  } = repository;

  function handleIssueNavigation(issueUrl: string) {
    Linking.openURL(issueUrl);
  }

  return (
    <Background>
      <Container>
        <RepoInfo>
          <OwnerAvatar source={{ uri: owner.avatar_url }} />

          <TextGroup>
            <TitleAnimation>{full_name}</TitleAnimation>

            <Description numberOfLines={2}>{description}</Description>
          </TextGroup>
        </RepoInfo>

        <RepoStats>
          <Stars>
            <StarsCounter>{stargazers_count}</StarsCounter>
            <StarsText>Stars</StarsText>
          </Stars>

          <Forks>
            <ForksCounter>{forks_count}</ForksCounter>
            <ForksText>Forks</ForksText>
          </Forks>

          <OpenIssues>
            <OpenIssuesCounter>{open_issues_count}</OpenIssuesCounter>
            <OpenIssuesText>Issues{"\n"}Abertas</OpenIssuesText>
          </OpenIssues>
        </RepoStats>

        <IssuesList
          data={repository.issues}
          keyExtractor={(issue) => String(issue.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: issue }) => (
            <Card
              data={{
                id: issue.id,
                title: issue.title,
                subTitle: issue.user.login,
              }}
              onPress={() => handleIssueNavigation(issue.html_url)}
            />
          )}
        />
      </Container>
    </Background>
  );
}
