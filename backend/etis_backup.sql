--
-- PostgreSQL database dump
--

\restrict ekalXdseAQlM1QlAV6uygtsmuaCfqDDtnZWZcXyL5VBx4dRPsoYYJEc9vOpf6aU

-- Dumped from database version 15.18 (Homebrew)
-- Dumped by pg_dump version 15.18 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: incident_logs; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.incident_logs (
    id integer NOT NULL,
    prediction_id integer,
    message text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.incident_logs OWNER TO abhisheksingh;

--
-- Name: incident_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.incident_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.incident_logs_id_seq OWNER TO abhisheksingh;

--
-- Name: incident_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.incident_logs_id_seq OWNED BY public.incident_logs.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    officer_id integer,
    message text,
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO abhisheksingh;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO abhisheksingh;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: officer_assignments; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.officer_assignments (
    id integer NOT NULL,
    prediction_id integer,
    officer_id integer,
    assigned_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status text DEFAULT 'Assigned'::text
);


ALTER TABLE public.officer_assignments OWNER TO abhisheksingh;

--
-- Name: officer_assignments_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.officer_assignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.officer_assignments_id_seq OWNER TO abhisheksingh;

--
-- Name: officer_assignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.officer_assignments_id_seq OWNED BY public.officer_assignments.id;


--
-- Name: officers; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.officers (
    id integer NOT NULL,
    name text,
    rank text,
    status text,
    latitude double precision,
    longitude double precision,
    email text,
    phone text,
    distance_km double precision,
    eta_minutes integer
);


ALTER TABLE public.officers OWNER TO abhisheksingh;

--
-- Name: officers_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.officers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.officers_id_seq OWNER TO abhisheksingh;

--
-- Name: officers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.officers_id_seq OWNED BY public.officers.id;


--
-- Name: prediction_history; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.prediction_history (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    event_type text,
    event_cause text,
    priority text,
    zone text,
    police_station text,
    severity text,
    congestion_score double precision,
    resource_score double precision,
    constables integer,
    asi integer,
    inspector integer,
    barricades integer,
    diversion text,
    latitude double precision,
    longitude double precision,
    status text DEFAULT 'Pending'::text
);


ALTER TABLE public.prediction_history OWNER TO abhisheksingh;

--
-- Name: prediction_history_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.prediction_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.prediction_history_id_seq OWNER TO abhisheksingh;

--
-- Name: prediction_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.prediction_history_id_seq OWNED BY public.prediction_history.id;


--
-- Name: predictions; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.predictions (
    id integer NOT NULL,
    severity character varying(50),
    congestion_score double precision,
    resource_score double precision,
    constables integer,
    barricades integer,
    diversion character varying(50),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.predictions OWNER TO abhisheksingh;

--
-- Name: predictions_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.predictions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.predictions_id_seq OWNER TO abhisheksingh;

--
-- Name: predictions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.predictions_id_seq OWNED BY public.predictions.id;


--
-- Name: user_reports; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.user_reports (
    id integer NOT NULL,
    event_type text,
    event_cause text,
    priority text,
    zone text,
    description text,
    latitude double precision,
    longitude double precision,
    status text DEFAULT 'Pending'::text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_reports OWNER TO abhisheksingh;

--
-- Name: user_reports_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.user_reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_reports_id_seq OWNER TO abhisheksingh;

--
-- Name: user_reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.user_reports_id_seq OWNED BY public.user_reports.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: abhisheksingh
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email character varying(255),
    password character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    role character varying(50) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO abhisheksingh;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: abhisheksingh
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO abhisheksingh;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: abhisheksingh
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: incident_logs id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.incident_logs ALTER COLUMN id SET DEFAULT nextval('public.incident_logs_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: officer_assignments id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.officer_assignments ALTER COLUMN id SET DEFAULT nextval('public.officer_assignments_id_seq'::regclass);


--
-- Name: officers id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.officers ALTER COLUMN id SET DEFAULT nextval('public.officers_id_seq'::regclass);


--
-- Name: prediction_history id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.prediction_history ALTER COLUMN id SET DEFAULT nextval('public.prediction_history_id_seq'::regclass);


--
-- Name: predictions id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.predictions ALTER COLUMN id SET DEFAULT nextval('public.predictions_id_seq'::regclass);


--
-- Name: user_reports id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.user_reports ALTER COLUMN id SET DEFAULT nextval('public.user_reports_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: incident_logs; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.incident_logs (id, prediction_id, message, created_at) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.notifications (id, officer_id, message, is_read, created_at) FROM stdin;
\.


--
-- Data for Name: officer_assignments; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.officer_assignments (id, prediction_id, officer_id, assigned_at, status) FROM stdin;
1	15	1	2026-06-21 18:35:25.675837	Assigned
2	16	1	2026-06-21 18:35:25.675837	Assigned
3	17	1	2026-06-21 18:35:25.675837	Assigned
4	18	1	2026-06-21 18:35:25.675837	Assigned
5	19	1	2026-06-21 18:35:25.675837	Assigned
6	20	1	2026-06-21 18:35:25.675837	Assigned
7	21	1	2026-06-21 18:35:25.675837	Assigned
\.


--
-- Data for Name: officers; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.officers (id, name, rank, status, latitude, longitude, email, phone, distance_km, eta_minutes) FROM stdin;
1	Officer_91	Inspector	Available	28.61	77.2	\N	\N	\N	\N
2	Officer_43	ASI	Available	28.62	77.23	\N	\N	\N	\N
3	Officer_59	ASI	Available	28.63	77.25	\N	\N	\N	\N
4	Officer_77	Constable	Available	28.65	77.22	\N	\N	\N	\N
5	Officer_88	Constable	Available	28.66	77.21	\N	\N	\N	\N
6	Officer_91	Inspector	Available	28.6139	77.209	\N	\N	\N	\N
7	Officer_43	ASI	Available	28.62	77.22	\N	\N	\N	\N
8	Officer_59	ASI	Available	28.63	77.23	\N	\N	\N	\N
9	Officer_77	Constable	Available	28.64	77.24	\N	\N	\N	\N
10	Officer_88	Constable	Available	28.65	77.25	\N	\N	\N	\N
11	Officer Singh	Inspector	Available	28.6139	77.209	singh@etis.com	9876543210	2.5	8
12	Officer Kumar	ASI	Available	28.62	77.215	kumar@etis.com	9876543211	4.1	12
13	Officer Verma	Constable	Available	28.63	77.22	verma@etis.com	9876543212	6.3	15
\.


--
-- Data for Name: prediction_history; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.prediction_history (id, created_at, event_type, event_cause, priority, zone, police_station, severity, congestion_score, resource_score, constables, asi, inspector, barricades, diversion, latitude, longitude, status) FROM stdin;
15	2026-06-20 16:15:57.767038	unplanned	accident	High	Central Zone 2	Yelahanka	Critical	92.51	67.33	13	3	1	19	Full	\N	\N	Pending
16	2026-06-20 16:16:30.094843	unplanned	accident	High	Central Zone 2	Yelahanka	Critical	92.51	67.33	13	3	1	19	Full	\N	\N	Pending
17	2026-06-20 16:16:38.854597	unplanned	accident	High	Central Zone 2	Yelahanka	Critical	92.51	67.33	13	3	1	19	Full	\N	\N	Pending
18	2026-06-20 16:46:29.17108	unplanned	accident	High	Central Zone 2	Yelahanka	Critical	92.51	67.33	13	3	1	19	Full	\N	\N	Pending
19	2026-06-21 08:13:38.644757	unplanned	accident	High	Central Zone 2	MG Road	Critical	84.3	65.05	13	3	1	18	Full	28.6139	77.209	Pending
20	2026-06-21 08:30:37.072	unplanned	accident	High	Central Zone 2	Yelahanka	Critical	92.51	67.33	13	3	1	19	Full	13.04	77.51	Pending
21	2026-06-21 09:27:33.751252	unplanned	accident	High	Central Zone 2	MG Road	Critical	84.3	62.64	13	3	1	18	Partial	28.6139	77.209	Pending
\.


--
-- Data for Name: predictions; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.predictions (id, severity, congestion_score, resource_score, constables, barricades, diversion, created_at) FROM stdin;
\.


--
-- Data for Name: user_reports; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.user_reports (id, event_type, event_cause, priority, zone, description, latitude, longitude, status, created_at) FROM stdin;
1	unplanned	Accident	High	Central Zone 2	Truck collision causing traffic	28.6139	77.209	Pending	2026-06-21 13:02:15.535983
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: abhisheksingh
--

COPY public.users (id, name, email, password, created_at, role) FROM stdin;
1	Abhi	abhi@12gmail.com	$2b$12$glaa0D6ikac90ms9COUkh.HxLVImpTacyX9x2tMn/09NzK1PQyGia	2026-06-21 09:32:37.245332	user
2	Officer Singh	officer@etis.com	$2b$12$xxxxxxxxxxxxxxxx	2026-06-21 18:32:43.775268	officer
3	Ati	at12@gmail.com	$2b$12$CSZbMgvmWgdv1edos1IRPOyV0/JC2u1OlQWDZ3fVVp3WBP3RDtEa2	2026-06-22 16:59:11.188521	admin
4	Athi	ah12@gmail.com	$2b$12$LbHzjNAD6Xrum2TnUWjsE.d.HgP8agYSFWIhc5bfsQyuDT1RKI7.O	2026-06-22 17:02:36.744381	officer
5	singh	si12@gmail.com	$2b$12$UwwiMxCRTRRr72sZWvraOOeoEi6MyF.6NCwaXOgH1eyd0oxiNhrdG	2026-06-22 17:10:09.884309	officer
6	sagar	s12@gmail.com	$2b$12$pVzF/3q9JPuVaM8PJoETpe6QlWKcSqikNqsGxvJwHg22w/FlW6932	2026-06-22 17:15:32.621018	admin
7	sagart	s123@gmail.com	$2b$12$5VKqRzcYvEEmpUcVjPf9i.9XrxEcR0XmCXSm9r7XNkBMK.DuAO/1q	2026-06-22 17:17:42.903584	user
8	Nidhi	n12@gmail.com	$2b$12$2HdmZF0VCnsNEfRonlQ0neEH0lBDlRwXa2AmjJUooql730FkSATYq	2026-06-23 09:10:19.012285	officer
9	Nidhi	ni12@gmail.com	$2b$12$4ewO6pxbUUiZSgVwpG2pMO/7dXngOkKU.1cDCsjNvUuTkHOZwQQO.	2026-06-23 09:11:03.34598	user
10	singh	sn12@gmail.com	$2b$12$3YrE4CBWMUQ6IRl7A865BOLcHb6XiDLNJlWvcVMXYC1iFvZURstyC	2026-06-23 10:36:35.023415	user
11	Abhishek Singh	abhi12@gmail.com	$2b$12$thdlA3NCLg4bnWY6ynCDiOFhiPj6JAwymS1SDfUc879dz5xa8K1Aq	2026-06-23 19:11:32.870857	Admin
\.


--
-- Name: incident_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.incident_logs_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: officer_assignments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.officer_assignments_id_seq', 7, true);


--
-- Name: officers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.officers_id_seq', 13, true);


--
-- Name: prediction_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.prediction_history_id_seq', 21, true);


--
-- Name: predictions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.predictions_id_seq', 1, false);


--
-- Name: user_reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.user_reports_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: abhisheksingh
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: incident_logs incident_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.incident_logs
    ADD CONSTRAINT incident_logs_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: officer_assignments officer_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.officer_assignments
    ADD CONSTRAINT officer_assignments_pkey PRIMARY KEY (id);


--
-- Name: officers officers_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.officers
    ADD CONSTRAINT officers_pkey PRIMARY KEY (id);


--
-- Name: prediction_history prediction_history_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.prediction_history
    ADD CONSTRAINT prediction_history_pkey PRIMARY KEY (id);


--
-- Name: predictions predictions_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.predictions
    ADD CONSTRAINT predictions_pkey PRIMARY KEY (id);


--
-- Name: user_reports user_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.user_reports
    ADD CONSTRAINT user_reports_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: abhisheksingh
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict ekalXdseAQlM1QlAV6uygtsmuaCfqDDtnZWZcXyL5VBx4dRPsoYYJEc9vOpf6aU

