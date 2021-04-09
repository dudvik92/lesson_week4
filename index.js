import express from 'express';
import http from 'http';
import {createReadStream} from 'fs';
import bodyParser from 'body-parser';
import crypto from 'crypto';


import appSrc from './app.js';

const app = appSrc(express, bodyParser, createReadStream, crypto, http); 

app.listen(process.env.PORT || 3000);

export {app, bodyParser, createReadStream, crypto, http}; 

