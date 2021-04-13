import express from 'express';
import http from 'http';
import mongo from 'mongodb';
import {createReadStream} from 'fs';
import bodyParser from 'body-parser';
import crypto from 'crypto';


import appSrc from './app.js';

const app = appSrc(express, bodyParser, createReadStream, crypto, http, mongo); 

app.listen(process.env.PORT || 3000);

