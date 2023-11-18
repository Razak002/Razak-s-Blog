"use client"
// import { useEffect, useState } from 'react';
import { client } from './lib/Sanity';
import Link from 'next/link';



async function getData() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data;
}

export const revalidate = 60
export default async function IndexPage() {
  const data = (await getData());

  return (
    <div>
      {data !== null ? (
        <ul>
          {data.map((post) => (
            <li key={post._id} className="py-4">
              <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                <div>
                  <p className="text-base font-medium leading-6 text-teal-500">
                    {new Date(post._createdAt).toISOString().split("T")[0]}
                  </p>
                </div>

                <Link
                  href={`/post/${post.slug.current}`}
                  prefetch
                  className="space-y-3 xl:col-span-3"
                >
                  <div>
                    <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                      {post.title}
                    </h3>
                  </div>

                  <p className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-2">
                    {post.overview}
                  </p>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};


