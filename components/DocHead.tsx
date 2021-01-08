import Head from "next/head";
import { FunctionComponent } from "react";

const DocHead: FunctionComponent = function () {
	return (
		<Head>
			<title>Kevin Latusinski</title>
			<link rel="icon" href="/favicon.ico" />
			<link rel="stylesheet" href="https://use.typekit.net/xhs5wzt.css" />
			<script src="https://unpkg.com/themeio@0.5.5/dist/default.min.js" />
		</Head>
	);
};

export default DocHead;
