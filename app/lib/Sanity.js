import { createClient } from "next-sanity";

const projectId = '6d2ennbu'
const dataset = 'production'
const apiVersion = '2023-11-18'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    withCredentials: true,
});