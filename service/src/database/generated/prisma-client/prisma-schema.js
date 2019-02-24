module.exports = {
  typeDefs: /* GraphQL */ `
    type AggregateGroup {
      count: Int!
    }

    type AggregateSnippet {
      count: Int!
    }

    type AggregateSnippetChunk {
      count: Int!
    }

    type BatchPayload {
      count: Long!
    }

    scalar DateTime

    type Group {
      id: ID!
      title: String!
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
      createdAt: DateTime!
      updatedAt: DateTime!
      snippets(
        where: SnippetWhereInput
        orderBy: SnippetOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Snippet!]
    }

    type GroupConnection {
      pageInfo: PageInfo!
      edges: [GroupEdge]!
      aggregate: AggregateGroup!
    }

    input GroupCreateInput {
      title: String!
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
      snippets: SnippetCreateManyWithoutGroupInput
    }

    input GroupCreateOneWithoutSnippetsInput {
      create: GroupCreateWithoutSnippetsInput
      connect: GroupWhereUniqueInput
    }

    input GroupCreateWithoutSnippetsInput {
      title: String!
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
    }

    type GroupEdge {
      node: Group!
      cursor: String!
    }

    enum GroupOrderByInput {
      id_ASC
      id_DESC
      title_ASC
      title_DESC
      description_ASC
      description_DESC
      author_ASC
      author_DESC
      isPublic_ASC
      isPublic_DESC
      isEncrypted_ASC
      isEncrypted_DESC
      password_ASC
      password_DESC
      isProtected_ASC
      isProtected_DESC
      expirationDatetime_ASC
      expirationDatetime_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type GroupPreviousValues {
      id: ID!
      title: String!
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    type GroupSubscriptionPayload {
      mutation: MutationType!
      node: Group
      updatedFields: [String!]
      previousValues: GroupPreviousValues
    }

    input GroupSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: GroupWhereInput
      AND: [GroupSubscriptionWhereInput!]
      OR: [GroupSubscriptionWhereInput!]
      NOT: [GroupSubscriptionWhereInput!]
    }

    input GroupUpdateInput {
      title: String
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
      snippets: SnippetUpdateManyWithoutGroupInput
    }

    input GroupUpdateManyMutationInput {
      title: String
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
    }

    input GroupUpdateOneRequiredWithoutSnippetsInput {
      create: GroupCreateWithoutSnippetsInput
      update: GroupUpdateWithoutSnippetsDataInput
      upsert: GroupUpsertWithoutSnippetsInput
      connect: GroupWhereUniqueInput
    }

    input GroupUpdateWithoutSnippetsDataInput {
      title: String
      description: String
      author: String
      isPublic: Boolean
      isEncrypted: Boolean
      password: String
      isProtected: Boolean
      expirationDatetime: DateTime
    }

    input GroupUpsertWithoutSnippetsInput {
      update: GroupUpdateWithoutSnippetsDataInput!
      create: GroupCreateWithoutSnippetsInput!
    }

    input GroupWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      title: String
      title_not: String
      title_in: [String!]
      title_not_in: [String!]
      title_lt: String
      title_lte: String
      title_gt: String
      title_gte: String
      title_contains: String
      title_not_contains: String
      title_starts_with: String
      title_not_starts_with: String
      title_ends_with: String
      title_not_ends_with: String
      description: String
      description_not: String
      description_in: [String!]
      description_not_in: [String!]
      description_lt: String
      description_lte: String
      description_gt: String
      description_gte: String
      description_contains: String
      description_not_contains: String
      description_starts_with: String
      description_not_starts_with: String
      description_ends_with: String
      description_not_ends_with: String
      author: String
      author_not: String
      author_in: [String!]
      author_not_in: [String!]
      author_lt: String
      author_lte: String
      author_gt: String
      author_gte: String
      author_contains: String
      author_not_contains: String
      author_starts_with: String
      author_not_starts_with: String
      author_ends_with: String
      author_not_ends_with: String
      isPublic: Boolean
      isPublic_not: Boolean
      isEncrypted: Boolean
      isEncrypted_not: Boolean
      password: String
      password_not: String
      password_in: [String!]
      password_not_in: [String!]
      password_lt: String
      password_lte: String
      password_gt: String
      password_gte: String
      password_contains: String
      password_not_contains: String
      password_starts_with: String
      password_not_starts_with: String
      password_ends_with: String
      password_not_ends_with: String
      isProtected: Boolean
      isProtected_not: Boolean
      expirationDatetime: DateTime
      expirationDatetime_not: DateTime
      expirationDatetime_in: [DateTime!]
      expirationDatetime_not_in: [DateTime!]
      expirationDatetime_lt: DateTime
      expirationDatetime_lte: DateTime
      expirationDatetime_gt: DateTime
      expirationDatetime_gte: DateTime
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      snippets_every: SnippetWhereInput
      snippets_some: SnippetWhereInput
      snippets_none: SnippetWhereInput
      AND: [GroupWhereInput!]
      OR: [GroupWhereInput!]
      NOT: [GroupWhereInput!]
    }

    input GroupWhereUniqueInput {
      id: ID
    }

    scalar Long

    type Mutation {
      createGroup(data: GroupCreateInput!): Group!
      updateGroup(data: GroupUpdateInput!, where: GroupWhereUniqueInput!): Group
      updateManyGroups(
        data: GroupUpdateManyMutationInput!
        where: GroupWhereInput
      ): BatchPayload!
      upsertGroup(
        where: GroupWhereUniqueInput!
        create: GroupCreateInput!
        update: GroupUpdateInput!
      ): Group!
      deleteGroup(where: GroupWhereUniqueInput!): Group
      deleteManyGroups(where: GroupWhereInput): BatchPayload!
      createSnippet(data: SnippetCreateInput!): Snippet!
      updateSnippet(
        data: SnippetUpdateInput!
        where: SnippetWhereUniqueInput!
      ): Snippet
      updateManySnippets(
        data: SnippetUpdateManyMutationInput!
        where: SnippetWhereInput
      ): BatchPayload!
      upsertSnippet(
        where: SnippetWhereUniqueInput!
        create: SnippetCreateInput!
        update: SnippetUpdateInput!
      ): Snippet!
      deleteSnippet(where: SnippetWhereUniqueInput!): Snippet
      deleteManySnippets(where: SnippetWhereInput): BatchPayload!
      createSnippetChunk(data: SnippetChunkCreateInput!): SnippetChunk!
      updateSnippetChunk(
        data: SnippetChunkUpdateInput!
        where: SnippetChunkWhereUniqueInput!
      ): SnippetChunk
      updateManySnippetChunks(
        data: SnippetChunkUpdateManyMutationInput!
        where: SnippetChunkWhereInput
      ): BatchPayload!
      upsertSnippetChunk(
        where: SnippetChunkWhereUniqueInput!
        create: SnippetChunkCreateInput!
        update: SnippetChunkUpdateInput!
      ): SnippetChunk!
      deleteSnippetChunk(where: SnippetChunkWhereUniqueInput!): SnippetChunk
      deleteManySnippetChunks(where: SnippetChunkWhereInput): BatchPayload!
    }

    enum MutationType {
      CREATED
      UPDATED
      DELETED
    }

    interface Node {
      id: ID!
    }

    type PageInfo {
      hasNextPage: Boolean!
      hasPreviousPage: Boolean!
      startCursor: String
      endCursor: String
    }

    type Query {
      group(where: GroupWhereUniqueInput!): Group
      groups(
        where: GroupWhereInput
        orderBy: GroupOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Group]!
      groupsConnection(
        where: GroupWhereInput
        orderBy: GroupOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): GroupConnection!
      snippet(where: SnippetWhereUniqueInput!): Snippet
      snippets(
        where: SnippetWhereInput
        orderBy: SnippetOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [Snippet]!
      snippetsConnection(
        where: SnippetWhereInput
        orderBy: SnippetOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): SnippetConnection!
      snippetChunk(where: SnippetChunkWhereUniqueInput!): SnippetChunk
      snippetChunks(
        where: SnippetChunkWhereInput
        orderBy: SnippetChunkOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [SnippetChunk]!
      snippetChunksConnection(
        where: SnippetChunkWhereInput
        orderBy: SnippetChunkOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): SnippetChunkConnection!
      node(id: ID!): Node
    }

    type Snippet {
      id: ID!
      author: String
      snippetName: String!
      syntax: String
      createdAt: DateTime!
      updatedAt: DateTime!
      chunks(
        where: SnippetChunkWhereInput
        orderBy: SnippetChunkOrderByInput
        skip: Int
        after: String
        before: String
        first: Int
        last: Int
      ): [SnippetChunk!]
      group: Group!
    }

    type SnippetChunk {
      id: ID!
      value: String!
      createdAt: DateTime!
      updatedAt: DateTime!
      snippet: Snippet!
    }

    type SnippetChunkConnection {
      pageInfo: PageInfo!
      edges: [SnippetChunkEdge]!
      aggregate: AggregateSnippetChunk!
    }

    input SnippetChunkCreateInput {
      value: String!
      snippet: SnippetCreateOneWithoutChunksInput!
    }

    input SnippetChunkCreateManyWithoutSnippetInput {
      create: [SnippetChunkCreateWithoutSnippetInput!]
      connect: [SnippetChunkWhereUniqueInput!]
    }

    input SnippetChunkCreateWithoutSnippetInput {
      value: String!
    }

    type SnippetChunkEdge {
      node: SnippetChunk!
      cursor: String!
    }

    enum SnippetChunkOrderByInput {
      id_ASC
      id_DESC
      value_ASC
      value_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type SnippetChunkPreviousValues {
      id: ID!
      value: String!
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    input SnippetChunkScalarWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      value: String
      value_not: String
      value_in: [String!]
      value_not_in: [String!]
      value_lt: String
      value_lte: String
      value_gt: String
      value_gte: String
      value_contains: String
      value_not_contains: String
      value_starts_with: String
      value_not_starts_with: String
      value_ends_with: String
      value_not_ends_with: String
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      AND: [SnippetChunkScalarWhereInput!]
      OR: [SnippetChunkScalarWhereInput!]
      NOT: [SnippetChunkScalarWhereInput!]
    }

    type SnippetChunkSubscriptionPayload {
      mutation: MutationType!
      node: SnippetChunk
      updatedFields: [String!]
      previousValues: SnippetChunkPreviousValues
    }

    input SnippetChunkSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: SnippetChunkWhereInput
      AND: [SnippetChunkSubscriptionWhereInput!]
      OR: [SnippetChunkSubscriptionWhereInput!]
      NOT: [SnippetChunkSubscriptionWhereInput!]
    }

    input SnippetChunkUpdateInput {
      value: String
      snippet: SnippetUpdateOneRequiredWithoutChunksInput
    }

    input SnippetChunkUpdateManyDataInput {
      value: String
    }

    input SnippetChunkUpdateManyMutationInput {
      value: String
    }

    input SnippetChunkUpdateManyWithoutSnippetInput {
      create: [SnippetChunkCreateWithoutSnippetInput!]
      delete: [SnippetChunkWhereUniqueInput!]
      connect: [SnippetChunkWhereUniqueInput!]
      disconnect: [SnippetChunkWhereUniqueInput!]
      update: [SnippetChunkUpdateWithWhereUniqueWithoutSnippetInput!]
      upsert: [SnippetChunkUpsertWithWhereUniqueWithoutSnippetInput!]
      deleteMany: [SnippetChunkScalarWhereInput!]
      updateMany: [SnippetChunkUpdateManyWithWhereNestedInput!]
    }

    input SnippetChunkUpdateManyWithWhereNestedInput {
      where: SnippetChunkScalarWhereInput!
      data: SnippetChunkUpdateManyDataInput!
    }

    input SnippetChunkUpdateWithoutSnippetDataInput {
      value: String
    }

    input SnippetChunkUpdateWithWhereUniqueWithoutSnippetInput {
      where: SnippetChunkWhereUniqueInput!
      data: SnippetChunkUpdateWithoutSnippetDataInput!
    }

    input SnippetChunkUpsertWithWhereUniqueWithoutSnippetInput {
      where: SnippetChunkWhereUniqueInput!
      update: SnippetChunkUpdateWithoutSnippetDataInput!
      create: SnippetChunkCreateWithoutSnippetInput!
    }

    input SnippetChunkWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      value: String
      value_not: String
      value_in: [String!]
      value_not_in: [String!]
      value_lt: String
      value_lte: String
      value_gt: String
      value_gte: String
      value_contains: String
      value_not_contains: String
      value_starts_with: String
      value_not_starts_with: String
      value_ends_with: String
      value_not_ends_with: String
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      snippet: SnippetWhereInput
      AND: [SnippetChunkWhereInput!]
      OR: [SnippetChunkWhereInput!]
      NOT: [SnippetChunkWhereInput!]
    }

    input SnippetChunkWhereUniqueInput {
      id: ID
    }

    type SnippetConnection {
      pageInfo: PageInfo!
      edges: [SnippetEdge]!
      aggregate: AggregateSnippet!
    }

    input SnippetCreateInput {
      author: String
      snippetName: String!
      syntax: String
      chunks: SnippetChunkCreateManyWithoutSnippetInput
      group: GroupCreateOneWithoutSnippetsInput!
    }

    input SnippetCreateManyWithoutGroupInput {
      create: [SnippetCreateWithoutGroupInput!]
      connect: [SnippetWhereUniqueInput!]
    }

    input SnippetCreateOneWithoutChunksInput {
      create: SnippetCreateWithoutChunksInput
      connect: SnippetWhereUniqueInput
    }

    input SnippetCreateWithoutChunksInput {
      author: String
      snippetName: String!
      syntax: String
      group: GroupCreateOneWithoutSnippetsInput!
    }

    input SnippetCreateWithoutGroupInput {
      author: String
      snippetName: String!
      syntax: String
      chunks: SnippetChunkCreateManyWithoutSnippetInput
    }

    type SnippetEdge {
      node: Snippet!
      cursor: String!
    }

    enum SnippetOrderByInput {
      id_ASC
      id_DESC
      author_ASC
      author_DESC
      snippetName_ASC
      snippetName_DESC
      syntax_ASC
      syntax_DESC
      createdAt_ASC
      createdAt_DESC
      updatedAt_ASC
      updatedAt_DESC
    }

    type SnippetPreviousValues {
      id: ID!
      author: String
      snippetName: String!
      syntax: String
      createdAt: DateTime!
      updatedAt: DateTime!
    }

    input SnippetScalarWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      author: String
      author_not: String
      author_in: [String!]
      author_not_in: [String!]
      author_lt: String
      author_lte: String
      author_gt: String
      author_gte: String
      author_contains: String
      author_not_contains: String
      author_starts_with: String
      author_not_starts_with: String
      author_ends_with: String
      author_not_ends_with: String
      snippetName: String
      snippetName_not: String
      snippetName_in: [String!]
      snippetName_not_in: [String!]
      snippetName_lt: String
      snippetName_lte: String
      snippetName_gt: String
      snippetName_gte: String
      snippetName_contains: String
      snippetName_not_contains: String
      snippetName_starts_with: String
      snippetName_not_starts_with: String
      snippetName_ends_with: String
      snippetName_not_ends_with: String
      syntax: String
      syntax_not: String
      syntax_in: [String!]
      syntax_not_in: [String!]
      syntax_lt: String
      syntax_lte: String
      syntax_gt: String
      syntax_gte: String
      syntax_contains: String
      syntax_not_contains: String
      syntax_starts_with: String
      syntax_not_starts_with: String
      syntax_ends_with: String
      syntax_not_ends_with: String
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      AND: [SnippetScalarWhereInput!]
      OR: [SnippetScalarWhereInput!]
      NOT: [SnippetScalarWhereInput!]
    }

    type SnippetSubscriptionPayload {
      mutation: MutationType!
      node: Snippet
      updatedFields: [String!]
      previousValues: SnippetPreviousValues
    }

    input SnippetSubscriptionWhereInput {
      mutation_in: [MutationType!]
      updatedFields_contains: String
      updatedFields_contains_every: [String!]
      updatedFields_contains_some: [String!]
      node: SnippetWhereInput
      AND: [SnippetSubscriptionWhereInput!]
      OR: [SnippetSubscriptionWhereInput!]
      NOT: [SnippetSubscriptionWhereInput!]
    }

    input SnippetUpdateInput {
      author: String
      snippetName: String
      syntax: String
      chunks: SnippetChunkUpdateManyWithoutSnippetInput
      group: GroupUpdateOneRequiredWithoutSnippetsInput
    }

    input SnippetUpdateManyDataInput {
      author: String
      snippetName: String
      syntax: String
    }

    input SnippetUpdateManyMutationInput {
      author: String
      snippetName: String
      syntax: String
    }

    input SnippetUpdateManyWithoutGroupInput {
      create: [SnippetCreateWithoutGroupInput!]
      delete: [SnippetWhereUniqueInput!]
      connect: [SnippetWhereUniqueInput!]
      disconnect: [SnippetWhereUniqueInput!]
      update: [SnippetUpdateWithWhereUniqueWithoutGroupInput!]
      upsert: [SnippetUpsertWithWhereUniqueWithoutGroupInput!]
      deleteMany: [SnippetScalarWhereInput!]
      updateMany: [SnippetUpdateManyWithWhereNestedInput!]
    }

    input SnippetUpdateManyWithWhereNestedInput {
      where: SnippetScalarWhereInput!
      data: SnippetUpdateManyDataInput!
    }

    input SnippetUpdateOneRequiredWithoutChunksInput {
      create: SnippetCreateWithoutChunksInput
      update: SnippetUpdateWithoutChunksDataInput
      upsert: SnippetUpsertWithoutChunksInput
      connect: SnippetWhereUniqueInput
    }

    input SnippetUpdateWithoutChunksDataInput {
      author: String
      snippetName: String
      syntax: String
      group: GroupUpdateOneRequiredWithoutSnippetsInput
    }

    input SnippetUpdateWithoutGroupDataInput {
      author: String
      snippetName: String
      syntax: String
      chunks: SnippetChunkUpdateManyWithoutSnippetInput
    }

    input SnippetUpdateWithWhereUniqueWithoutGroupInput {
      where: SnippetWhereUniqueInput!
      data: SnippetUpdateWithoutGroupDataInput!
    }

    input SnippetUpsertWithoutChunksInput {
      update: SnippetUpdateWithoutChunksDataInput!
      create: SnippetCreateWithoutChunksInput!
    }

    input SnippetUpsertWithWhereUniqueWithoutGroupInput {
      where: SnippetWhereUniqueInput!
      update: SnippetUpdateWithoutGroupDataInput!
      create: SnippetCreateWithoutGroupInput!
    }

    input SnippetWhereInput {
      id: ID
      id_not: ID
      id_in: [ID!]
      id_not_in: [ID!]
      id_lt: ID
      id_lte: ID
      id_gt: ID
      id_gte: ID
      id_contains: ID
      id_not_contains: ID
      id_starts_with: ID
      id_not_starts_with: ID
      id_ends_with: ID
      id_not_ends_with: ID
      author: String
      author_not: String
      author_in: [String!]
      author_not_in: [String!]
      author_lt: String
      author_lte: String
      author_gt: String
      author_gte: String
      author_contains: String
      author_not_contains: String
      author_starts_with: String
      author_not_starts_with: String
      author_ends_with: String
      author_not_ends_with: String
      snippetName: String
      snippetName_not: String
      snippetName_in: [String!]
      snippetName_not_in: [String!]
      snippetName_lt: String
      snippetName_lte: String
      snippetName_gt: String
      snippetName_gte: String
      snippetName_contains: String
      snippetName_not_contains: String
      snippetName_starts_with: String
      snippetName_not_starts_with: String
      snippetName_ends_with: String
      snippetName_not_ends_with: String
      syntax: String
      syntax_not: String
      syntax_in: [String!]
      syntax_not_in: [String!]
      syntax_lt: String
      syntax_lte: String
      syntax_gt: String
      syntax_gte: String
      syntax_contains: String
      syntax_not_contains: String
      syntax_starts_with: String
      syntax_not_starts_with: String
      syntax_ends_with: String
      syntax_not_ends_with: String
      createdAt: DateTime
      createdAt_not: DateTime
      createdAt_in: [DateTime!]
      createdAt_not_in: [DateTime!]
      createdAt_lt: DateTime
      createdAt_lte: DateTime
      createdAt_gt: DateTime
      createdAt_gte: DateTime
      updatedAt: DateTime
      updatedAt_not: DateTime
      updatedAt_in: [DateTime!]
      updatedAt_not_in: [DateTime!]
      updatedAt_lt: DateTime
      updatedAt_lte: DateTime
      updatedAt_gt: DateTime
      updatedAt_gte: DateTime
      chunks_every: SnippetChunkWhereInput
      chunks_some: SnippetChunkWhereInput
      chunks_none: SnippetChunkWhereInput
      group: GroupWhereInput
      AND: [SnippetWhereInput!]
      OR: [SnippetWhereInput!]
      NOT: [SnippetWhereInput!]
    }

    input SnippetWhereUniqueInput {
      id: ID
    }

    type Subscription {
      group(where: GroupSubscriptionWhereInput): GroupSubscriptionPayload
      snippet(where: SnippetSubscriptionWhereInput): SnippetSubscriptionPayload
      snippetChunk(
        where: SnippetChunkSubscriptionWhereInput
      ): SnippetChunkSubscriptionPayload
    }
  `,
};
