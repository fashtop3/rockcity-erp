-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 10, 2017 at 05:50 PM
-- Server version: 5.7.19-0ubuntu0.16.04.1-log
-- PHP Version: 7.0.18-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rockcity`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `id` int(10) UNSIGNED NOT NULL,
  `assessment_config_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `preview` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`id`, `assessment_config_id`, `user_id`, `preview`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, '2017-01-03 08:42:05', '2017-06-08 14:16:24'),
(11, 2, 1, 0, '2017-06-04 21:41:38', '2017-06-08 14:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_configs`
--

CREATE TABLE `assessment_configs` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '0',
  `starts` datetime NOT NULL,
  `ends` datetime NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessment_configs`
--

INSERT INTO `assessment_configs` (`id`, `user_id`, `enable`, `starts`, `ends`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 0, '2016-09-22 00:00:00', '2017-01-27 00:00:00', NULL, '2016-09-23 07:10:42', '2017-06-08 14:16:23'),
(2, 1, 1, '2017-06-02 00:00:00', '2017-06-29 00:00:00', NULL, '2017-06-03 12:29:03', '2017-06-08 14:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_part_ones`
--

CREATE TABLE `assessment_part_ones` (
  `id` int(10) UNSIGNED NOT NULL,
  `assessment_id` int(10) UNSIGNED NOT NULL,
  `personal` text COLLATE utf8_unicode_ci NOT NULL,
  `qualifications` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessment_part_ones`
--

INSERT INTO `assessment_part_ones` (`id`, `assessment_id`, `personal`, `qualifications`, `created_at`, `updated_at`) VALUES
(1, 1, 'a:4:{s:12:"date_confirm";a:2:{s:4:"date";s:24:"2017-01-02T23:00:00.000Z";s:6:"opened";b:0;}s:14:"appraisal_date";a:2:{s:4:"date";s:24:"2017-01-09T23:00:00.000Z";s:6:"opened";b:0;}s:14:"period_covered";s:7:"jegfGYU";s:14:"appraisal_name";s:7:"SNVJHBW";}', 'a:4:{i:0;a:3:{s:4:"date";s:24:"2017-01-02T23:00:00.000Z";s:6:"opened";b:0;s:4:"name";s:6:"DFSJHU";}i:1;a:3:{s:4:"date";s:24:"2017-01-02T23:00:00.000Z";s:6:"opened";b:0;s:4:"name";s:9:"JHUHUIHIU";}i:2;a:3:{s:4:"date";s:24:"2017-01-09T23:00:00.000Z";s:6:"opened";b:0;s:4:"name";s:7:"UHUIHIU";}i:3;a:2:{s:4:"date";s:0:"";s:6:"opened";b:0;}}', '2017-01-03 08:42:05', '2017-01-03 08:42:05'),
(2, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 21:41:38', '2017-06-04 21:41:38'),
(3, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:02:00', '2017-06-04 22:02:00'),
(4, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:02:10', '2017-06-04 22:02:10'),
(5, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:02:23', '2017-06-04 22:02:23'),
(6, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:02:35', '2017-06-04 22:02:35'),
(7, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:02:41', '2017-06-04 22:02:41'),
(8, 11, 'a:4:{s:14:"period_covered";s:8:"rwgnjwhr";s:12:"confirm_date";s:10:"2017-06-04";s:14:"appraisal_date";s:10:"2017-06-04";s:14:"appraisal_name";s:5:"mklre";}', 'a:4:{i:0;a:2:{s:4:"name";s:6:"dfkmkj";s:4:"date";s:10:"2017-06-04";}i:1;a:2:{s:4:"name";s:5:"okoko";s:4:"date";s:10:"2017-06-04";}i:2;a:2:{s:4:"name";s:6:"okopko";s:4:"date";s:10:"2017-06-14";}i:3;a:2:{s:4:"name";s:6:"okpoko";s:4:"date";s:10:"2017-06-23";}}', '2017-06-04 22:03:40', '2017-06-04 22:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_part_threes`
--

CREATE TABLE `assessment_part_threes` (
  `id` int(10) UNSIGNED NOT NULL,
  `assessment_id` int(10) UNSIGNED NOT NULL,
  `competencies` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessment_part_threes`
--

INSERT INTO `assessment_part_threes` (`id`, `assessment_id`, `competencies`, `created_at`, `updated_at`) VALUES
(1, 1, 'a:1:{s:10:"additional";s:18:"sdsfs\nsgsgweg";}', '2017-01-03 08:42:05', '2017-01-03 10:14:11'),
(2, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";s:3:"hhh";}', '2017-06-04 21:41:39', '2017-06-04 21:41:39'),
(3, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:02:01', '2017-06-04 22:02:01'),
(4, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:02:10', '2017-06-04 22:02:10'),
(5, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:02:23', '2017-06-04 22:02:23'),
(6, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:02:35', '2017-06-04 22:02:35'),
(7, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:02:41', '2017-06-04 22:02:41'),
(8, 11, 'a:8:{s:14:"responsibility";s:8:"srwhuhuh";s:5:"focus";s:7:"uhuihui";s:10:"creativity";s:6:"huihuh";s:13:"collaboration";s:3:"uhu";s:13:"communication";s:6:"huhuih";s:5:"skill";s:4:"uiuh";s:7:"quality";s:9:"uhuihuihh";s:10:"additional";N;}', '2017-06-04 22:03:40', '2017-06-04 22:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_part_twos`
--

CREATE TABLE `assessment_part_twos` (
  `id` int(10) UNSIGNED NOT NULL,
  `assessment_id` int(10) UNSIGNED NOT NULL,
  `review` text COLLATE utf8_unicode_ci NOT NULL,
  `performance` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessment_part_twos`
--

INSERT INTO `assessment_part_twos` (`id`, `assessment_id`, `review`, `performance`, `created_at`, `updated_at`) VALUES
(1, 1, 'a:3:{i:0;a:2:{s:4:"text";s:4:"NJHH";s:4:"rate";s:1:"1";}i:1;N;i:2;a:2:{s:4:"text";s:6:"IHOIHU";s:4:"rate";s:2:"18";}}', 'a:6:{s:14:"accomplishment";s:7:"NDBGHJG";s:5:"cause";s:6:"UHUIUH";s:11:"experiences";s:7:"UHIUHUH";s:7:"ability";s:6:"KHUHUI";s:12:"satisfaction";s:6:"HIUGHH";s:8:"strength";s:2:"GH";}', '2017-01-03 08:42:05', '2017-01-03 08:42:05'),
(2, 11, 'a:7:{i:0;a:2:{s:4:"text";s:7:"menklki";s:4:"rate";s:1:"8";}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 21:41:39', '2017-06-04 21:41:39'),
(3, 11, 'a:7:{i:0;a:2:{s:4:"text";s:7:"menklki";s:4:"rate";s:1:"8";}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:02:01', '2017-06-04 22:02:01'),
(4, 11, 'a:7:{i:0;a:2:{s:4:"text";s:7:"menklki";s:4:"rate";s:1:"8";}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:02:10', '2017-06-04 22:02:10'),
(5, 11, 'a:7:{i:0;a:2:{s:4:"text";s:7:"menklki";s:4:"rate";s:1:"8";}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:02:23', '2017-06-04 22:02:23'),
(6, 11, 'a:7:{i:0;a:2:{s:4:"text";s:7:"menklki";s:4:"rate";N;}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:02:35', '2017-06-04 22:02:35'),
(7, 11, 'a:7:{i:0;a:2:{s:4:"text";N;s:4:"rate";N;}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:02:41', '2017-06-04 22:02:41'),
(8, 11, 'a:7:{i:0;a:2:{s:4:"text";N;s:4:"rate";N;}i:1;a:2:{s:4:"text";s:8:"jijijiji";s:4:"rate";s:1:"7";}i:2;a:2:{s:4:"text";s:5:"lkjip";s:4:"rate";s:1:"9";}i:3;a:2:{s:4:"text";s:11:"ojpojpjopjp";s:4:"rate";s:2:"14";}i:4;a:2:{s:4:"text";s:10:"fdmbklmjdi";s:4:"rate";s:2:"14";}i:5;a:2:{s:4:"text";s:8:"dtyje65t";s:4:"rate";s:2:"14";}i:6;a:2:{s:4:"text";s:7:"gsnnrjn";s:4:"rate";s:2:"12";}}', 'a:6:{s:14:"accomplishment";s:17:"gfsbihisjiujoi4wj";s:5:"cause";s:18:"ji;sjohsiorujtihio";s:11:"experiences";s:21:"qoopeijpwr\r\nrtwhrthwe";s:7:"ability";s:15:"thwntikhjilwe5r";s:12:"satisfaction";s:10:"mnbjghugui";s:8:"strength";s:11:"hihuioyhiho";}', '2017-06-04 22:03:40', '2017-06-04 22:03:40');

-- --------------------------------------------------------

--
-- Table structure for table `assessment_supervisors`
--

CREATE TABLE `assessment_supervisors` (
  `id` int(10) UNSIGNED NOT NULL,
  `preview` tinyint(1) NOT NULL DEFAULT '1',
  `user_id` int(10) UNSIGNED NOT NULL,
  `assessment_id` int(10) UNSIGNED NOT NULL,
  `attributes` text COLLATE utf8_unicode_ci NOT NULL,
  `habit` text COLLATE utf8_unicode_ci NOT NULL,
  `leadership` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `assessment_supervisors`
--

INSERT INTO `assessment_supervisors` (`id`, `preview`, `user_id`, `assessment_id`, `attributes`, `habit`, `leadership`, `created_at`, `updated_at`) VALUES
(8, 1, 1, 11, 'a:2:{s:9:"integrity";s:2:"10";s:7:"justify";N;}', 'a:3:{s:7:"justify";N;s:9:"sanctions";N;s:7:"rewards";N;}', 'a:1:{s:7:"justify";N;}', '2017-06-08 12:52:51', '2017-06-08 12:52:51');

-- --------------------------------------------------------

--
-- Table structure for table `challenges`
--

CREATE TABLE `challenges` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `htmlText` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `challenges`
--

INSERT INTO `challenges` (`id`, `report_id`, `htmlText`, `created_at`, `updated_at`) VALUES
(1, 6, '<p>rgerg</p>', '2017-04-26 06:31:30', '2017-04-26 06:31:30');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `street_no` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `street_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `town` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `user_id`, `name`, `street_no`, `street_name`, `town`, `title`, `firstname`, `lastname`, `mobile`, `email`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 1, 'Dynamic drive', 'fake street', 'fake street', 'fake town', 'Mr', 'Babatunde', 'Fashola', '08000000000', 'fashtop1@gmail.com', NULL, '2016-07-31 10:19:25', '2017-05-02 09:55:42'),
(2, 1, 'my client', 'street no', 'street name', 'my town', 'Miss', 'fake', 'name', '08035243546', 'example@gmail.com', '2016-08-01 20:35:47', '2016-08-01 20:35:33', '2016-08-01 20:35:47'),
(3, 1, 'hjhkhhuihiohioh', 'mjkhjhk', 'knkhkjkh', 'nkhikh', 'Dr', 'hhju', 'mmjkkk', '98987767565', 'kjkhjkjjk@ggg.com', '2016-08-01 20:37:34', '2016-08-01 20:36:36', '2016-08-01 20:37:34'),
(6, 1, 'gwhwh', 'wjwrhjt4', 'wehw4', 'ergeeerw', 'Alhaja', 'ewhhwhshf', 'adhrha', '435434353434', 'dabfba@ehrtj.eg', '2016-08-02 07:39:01', '2016-08-02 07:38:52', '2016-08-02 07:39:01'),
(19, 12, 'CAC Oke Agbara', '14 shaha', 'shanshangi', 'Jos', 'Mr', 'ogeni', 'rauf', '87878367663', 'jhjhd@hh.com', NULL, '2016-08-03 13:27:52', '2016-08-03 13:27:52'),
(21, 12, 'dantata', 'jhsjdghs', 'jhhgojoijw', 'jekingbo', 'Mr', 'Dangote', 'Aliko', '76727161535', 'dfdw@h.com', NULL, '2016-08-03 13:45:26', '2016-08-03 13:45:26'),
(22, 10, 'Nestle', 'miango', 'parshin', 'Mangu', 'Mr', 'asjjj', 'kljkjdk', '2863261245415', 'hjgdgas@kk.org', '2016-08-03 18:46:04', '2016-08-03 14:05:29', '2016-08-03 18:46:04'),
(29, 14, 'B and K Communication', '11 Flat Housing', 'Asero Estate', 'Abeokuta', 'Mrs', 'Damilola', 'Torera', '08173295240', 'bukkymala@gmail.com', NULL, '2016-09-07 18:04:13', '2016-09-07 18:04:13'),
(30, 15, 'jasdjs', 'jswdsd', 'kjhswd', 'hjsdjs', 'Mr', 'ioiiewi', 'ioooer', '7837633887369', 'ask@jjd.com', '2016-09-14 11:23:59', '2016-09-07 18:23:31', '2016-09-14 11:23:59'),
(31, 14, 'B K&T communication', '11 Blk', 'Housing Estate', 'Abeokuta', 'Miss', 'Tise', 'Oluwatomirera', '08173295240', 'bukkymal@yahoo.com', NULL, '2016-09-13 13:32:49', '2016-09-13 13:32:49'),
(32, 14, 'Tishbob Enterprises', 'Shop 62', 'Panseke', 'Abeokuta', 'Mr', 'Ore', 'Olatunbosun', '08098160705', 'saphemmy@yahoo.com', NULL, '2016-09-13 13:38:41', '2016-09-13 13:38:41'),
(39, 16, 'Southwest resource center', '1', 'Oke -imosan', 'Abeokta', 'Mr', 'daddy', 'danladi', '08866388262', 'sakakdk@g.com', NULL, '2016-09-17 13:14:10', '2016-09-17 13:14:10'),
(40, 15, 'LocalMag Enterprises', '17', 'Ago-Oko', 'Abeokuta', 'Mr', 'Femi', 'Lawson', '08092106666', 'niranero@yahoo.com', NULL, '2016-09-17 13:20:46', '2016-09-17 13:20:46'),
(41, 15, 'Nerosam Ltd', 'Blk 10 House 11', 'Asero Estate', 'Abeokuta', 'Pastor', 'Gbenga', 'Soetan', '08022514366', 'p.o.malaolu@gmail.com', NULL, '2016-09-17 13:22:49', '2016-09-17 13:22:49'),
(42, 15, 'Niyi Billion Enterprises', '25', 'Obafemi Awolowo Way', 'Abeokuta', 'Mr', 'Niyi', 'Omoniyi', '08033943014', 'niranomiro@yahoo.com', NULL, '2016-09-17 13:25:05', '2016-09-17 13:25:05'),
(43, 14, 'Dammy Costmetic Store', '23', 'Adelabu Street', 'Abeokuta', 'Mrs', 'Damilare', 'Elegbede', '08058852014', 'saphemmy@gmail.com', NULL, '2016-09-17 14:08:06', '2016-09-17 14:08:06'),
(44, 15, 'Bellshea Enterprises', '15', 'Abule Odu', 'Lagos', 'Alhaji', 'Olawale', 'Ishola', '08099876868', 'obaoba001@yahoo.com', NULL, '2016-09-17 14:32:41', '2016-09-17 14:32:41'),
(45, 15, 'Bolutife Enterprises', '18', 'Oke Ado', 'Ibadan', 'Mr', 'Sola', 'Adekunle', '08092287667', 'oreboy1997@yahoo.com', NULL, '2016-09-17 15:06:03', '2016-09-17 15:06:03'),
(46, 15, 'Bolutife Pharmacy', '12', 'Abiola Way', 'Abeokuta', 'Mr', 'John', 'Imoh', '08172105505', 'oreboy@yahoo.com', NULL, '2016-09-22 18:20:37', '2016-09-22 18:20:37'),
(48, 1, 'Dj Speaky Media', '22', 'Amarachi Street', 'Abia', 'Mr', 'Tobi', 'Adekonojo', '08033505654', '', NULL, '2016-09-23 11:11:56', '2016-09-23 11:11:56'),
(49, 15, 'David Longman Ltd', '24', 'Iyalode Street', 'Lagos', 'Mr', 'David', 'Longman', '08099098898', '', NULL, '2016-09-29 18:10:48', '2016-09-29 18:10:48'),
(50, 16, 'Bablo Media Ltd', '29', 'Desalu Street', 'Ibadan', 'Mr', 'Yomi', 'Dickson', '08089089089', '', NULL, '2016-09-29 18:38:29', '2016-09-29 18:38:29'),
(51, 15, 'BQ Media Company', '60', 'Egbeda Road Idimu', 'Lagos', 'Mr', 'Dekunle', 'Lawrence', '08098765675', '', NULL, '2016-09-30 18:01:39', '2016-09-30 18:01:39'),
(52, 15, 'Ninab Enterprises', '19', 'Ebi Npejo Lane', 'Lagos', 'Mr', 'Nojeem', 'Jimoh', '09092347676', '', NULL, '2016-10-03 14:53:41', '2016-10-03 14:53:41'),
(53, 1, 'eheruh', 'uhiuhui', 'huhuihuh', 'bhjghhj', 'Miss', 'bjbjbhj', 'bhbjh', '0897655363', 'fashtop3@gmail.com', NULL, '2017-05-01 02:54:33', '2017-05-01 02:54:33');

-- --------------------------------------------------------

--
-- Table structure for table `driver_reports`
--

CREATE TABLE `driver_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `vehicle_id` int(10) UNSIGNED NOT NULL,
  `info` text COLLATE utf8_unicode_ci NOT NULL,
  `html_text` longtext COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `driver_reports`
--

INSERT INTO `driver_reports` (`id`, `user_id`, `vehicle_id`, `info`, `html_text`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'a:15:{s:12:"time_inspect";s:5:"01:12";s:11:"water_level";s:1:"0";s:9:"oil_level";s:1:"0";s:10:"fuel_level";s:12:"Quarter tank";s:15:"break_condition";s:4:"Fair";s:18:"absorber_condition";s:4:"Fair";s:11:"time_washed";s:5:"01:11";s:9:"passenger";s:5:"ljiji";s:11:"destination";s:5:"knjkl";s:10:"millage_bl";s:8:"njikilji";s:10:"millage_rt";s:7:"ijijioj";s:8:"time_out";s:5:"01:11";s:9:"time_back";s:5:"01:11";s:7:"fuel_bl";s:7:"kijijoi";s:7:"fuel_bk";s:8:"njhkjhku";}', '<b>bjbjjk<u>ihihihiihi</u></b><u>ikjijijijijij</u>hgjhgiknjnj<div style="text-align: left;"></div>', '2017-06-03 11:16:11', '2017-06-03 12:25:44'),
(2, 1, 1, 'a:15:{s:12:"time_inspect";s:5:"01:12";s:11:"water_level";s:1:"0";s:9:"oil_level";s:1:"0";s:10:"fuel_level";s:12:"Quarter tank";s:15:"break_condition";s:4:"Fair";s:18:"absorber_condition";s:4:"Fair";s:11:"time_washed";s:5:"01:11";s:9:"passenger";s:5:"ljiji";s:11:"destination";s:5:"knjkl";s:10:"millage_bl";s:8:"njikilji";s:10:"millage_rt";s:7:"ijijioj";s:8:"time_out";s:5:"01:11";s:9:"time_back";s:5:"01:11";s:7:"fuel_bl";s:7:"kijijoi";s:7:"fuel_bk";s:8:"njhkjhku";}', NULL, '2017-06-03 11:17:02', '2017-06-03 12:13:12');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2015_01_15_105324_create_roles_table', 1),
('2015_01_15_114412_create_role_user_table', 1),
('2015_01_26_115212_create_permissions_table', 1),
('2015_01_26_115523_create_permission_role_table', 1),
('2015_02_09_132439_create_permission_user_table', 1),
('2016_04_13_055830_create_clients_table', 1),
('2016_04_18_042359_create_products_table', 1),
('2016_04_18_043437_create_prices_table', 1),
('2016_05_24_072259_create_schedules_table', 1),
('2016_05_25_081856_create_uploads_table', 1),
('2016_05_30_051822_create_vehicles_table', 1),
('2016_05_31_152336_create_targets_table', 1),
('2016_05_31_152539_create_reports_table', 1),
('2016_05_31_184109_create_tasks_table', 1),
('2016_05_31_184133_create_challenges_table', 1),
('2016_05_31_184145_create_remittances_table', 1),
('2016_05_31_184213_create_report_uploads_table', 1),
('2016_05_31_184243_create_report_vehicles_table', 1),
('2016_06_06_203515_create_schedule_alerts_table', 1),
('2016_06_22_085109_create_driver_reports_table', 1),
('2016_07_07_144406_create_assessments_table', 1),
('2016_07_07_144527_create_assessment_part_ones_table', 1),
('2016_07_07_144533_create_assessment_part_twos_table', 1),
('2016_07_07_144545_create_assessment_part_threes_table', 1),
('2016_07_07_144612_create_assessment_supervisors_table', 1),
('2016_07_16_103503_create_schedule_products_table', 1),
('2016_07_16_104150_create_schedule_product_subs_table', 1),
('2016_07_16_104538_create_schedule_product_sub_details_table', 1),
('2016_09_21_071024_create_product_times_table', 2),
('2016_09_21_075608_add_soft_delete_to_schedule', 2),
('2016_05_17_221000_create_promocodes_table', 3),
('2016_09_28_171259_add_promocode_to_schedules_table', 3),
('2016_10_21_215208_create_subscription_attachments_table', 4),
('2016_12_07_155301_add_grades_to_task_report', 5),
('2015_08_04_131614_create_settings_table', 6),
('2017_04_26_121309_add_upload_to_user', 6),
('2017_05_30_093835_soft', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('niran.malaolu@rockcityfmradio.com', 'tc4zDZQW6CK1PVaT8XMY1PasN8xAFGSH51exNoyZdlnSyCxfXWfkWIWtsmtW', '2016-09-07 17:34:55');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `slug`, `description`, `model`, `created_at`, `updated_at`) VALUES
(1, 'Create Airtime', 'create.airtime', NULL, NULL, '2016-06-01 01:10:39', '2016-06-01 01:10:39'),
(2, 'Edit Airtime', 'edit.airtime', NULL, NULL, '2016-06-01 01:12:39', '2016-06-01 01:12:39'),
(3, 'Approve Airtime', 'approve.airtime', NULL, NULL, '2016-06-01 01:12:54', '2016-06-01 01:12:54'),
(4, 'Validate Airtime', 'validate.airtime', NULL, NULL, '2016-06-01 01:13:11', '2016-06-01 01:13:11'),
(5, 'Deny Airtime Approval', 'deny.airtime', NULL, NULL, '2016-06-01 01:13:49', '2016-06-01 01:13:49'),
(6, 'Recommend Approval', 'recommend.approval', NULL, NULL, '2016-06-01 01:14:20', '2016-06-01 01:14:20'),
(7, 'Programme Airtime', 'programme.airtime', NULL, NULL, '2016-06-01 01:14:56', '2016-06-01 01:14:56'),
(8, 'Register Staff', 'register.staff', NULL, NULL, '2016-06-01 01:15:21', '2016-06-01 01:15:21'),
(9, 'View verified Staff', 'view.verified.staff', NULL, NULL, '2016-06-01 01:16:16', '2016-06-01 01:16:16'),
(10, 'Generate Airtime', 'generate.airtime', NULL, NULL, '2016-06-01 01:16:58', '2016-06-01 01:16:58'),
(11, 'Programmes Airtime Approved', 'programmes.airtime.approved', NULL, NULL, '2016-06-01 01:17:58', '2016-06-01 01:17:58'),
(12, 'Verify Staff', 'verify.staff', NULL, NULL, '2016-06-01 01:18:27', '2016-06-01 01:18:27'),
(13, 'View Remitance', 'view.remittance', NULL, NULL, '2016-06-10 04:46:47', '2016-06-10 04:46:47'),
(14, 'View Report', 'view.report', NULL, NULL, '2016-06-10 04:48:11', '2016-06-10 04:48:11'),
(15, 'Generate Report', 'generate.report', NULL, NULL, '2016-06-10 04:48:52', '2016-06-10 04:48:52'),
(16, 'Manage Vehicle', 'manage.vehicle', NULL, NULL, '2016-06-10 05:08:15', '2016-06-10 05:08:15'),
(17, 'Manage Target', 'manage.target', NULL, NULL, '2016-06-10 05:12:02', '2016-06-10 05:12:02');

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_user`
--

CREATE TABLE `permission_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `permission_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission_user`
--

INSERT INTO `permission_user` (`id`, `permission_id`, `user_id`, `created_at`, `updated_at`) VALUES
(87, 1, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(88, 2, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(93, 7, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(95, 9, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(96, 10, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(97, 11, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(100, 14, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(101, 15, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(103, 17, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(109, 7, 12, '2016-08-03 13:24:22', '2016-08-03 13:24:22'),
(110, 10, 12, '2016-08-03 13:24:22', '2016-08-03 13:24:22'),
(111, 15, 12, '2016-08-03 13:24:22', '2016-08-03 13:24:22'),
(112, 1, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(113, 2, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(114, 3, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(115, 4, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(116, 5, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(117, 6, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(118, 7, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(119, 8, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(120, 9, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(121, 10, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(122, 11, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(123, 12, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(124, 13, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(125, 14, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(126, 15, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(127, 16, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(128, 17, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(155, 11, 1, '2016-09-12 17:17:25', '2016-09-12 17:17:25'),
(161, 17, 1, '2016-09-12 17:17:25', '2016-09-12 17:17:25'),
(162, 1, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(163, 2, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(164, 3, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(165, 4, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(166, 5, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(167, 6, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(168, 7, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(169, 8, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(170, 9, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(171, 10, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(172, 11, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(173, 12, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(174, 13, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(175, 14, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(176, 15, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(177, 16, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(178, 17, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(179, 1, 16, '2016-09-13 13:54:25', '2016-09-13 13:54:25'),
(180, 2, 16, '2016-09-13 13:54:25', '2016-09-13 13:54:25'),
(188, 10, 16, '2016-09-13 13:54:25', '2016-09-13 13:54:25'),
(197, 1, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(198, 2, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(199, 9, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(200, 10, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(201, 14, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(202, 15, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(203, 1, 18, '2016-09-23 13:34:10', '2016-09-23 13:34:10'),
(204, 2, 18, '2016-09-23 13:34:10', '2016-09-23 13:34:10'),
(205, 14, 18, '2016-09-23 13:34:11', '2016-09-23 13:34:11'),
(206, 15, 18, '2016-09-23 13:34:11', '2016-09-23 13:34:11'),
(207, 17, 18, '2016-09-23 13:34:11', '2016-09-23 13:34:11'),
(208, 10, 18, '2016-09-23 13:47:35', '2016-09-23 13:47:35'),
(209, 12, 18, '2017-05-30 07:39:58', '2017-05-30 07:39:58'),
(232, 6, 19, '2017-05-30 08:14:35', '2017-05-30 08:14:35'),
(233, 7, 19, '2017-05-30 08:14:35', '2017-05-30 08:14:35'),
(236, 10, 19, '2017-05-30 08:14:35', '2017-05-30 08:14:35'),
(242, 1, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(243, 2, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(244, 3, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(245, 4, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(246, 5, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(247, 6, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(248, 7, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(249, 8, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(250, 9, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(251, 10, 1, '2017-05-30 08:16:50', '2017-05-30 08:16:50'),
(252, 12, 1, '2017-05-30 08:16:50', '2017-05-30 08:16:50'),
(253, 14, 1, '2017-05-30 08:16:50', '2017-05-30 08:16:50'),
(254, 15, 1, '2017-05-30 08:16:50', '2017-05-30 08:16:50'),
(255, 16, 1, '2017-05-30 08:16:50', '2017-05-30 08:16:50');

-- --------------------------------------------------------

--
-- Table structure for table `prices`
--

CREATE TABLE `prices` (
  `id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `duration` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `premium` decimal(12,2) NOT NULL,
  `regular` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `prices`
--

INSERT INTO `prices` (`id`, `product_id`, `duration`, `premium`, `regular`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, '40000.00', '40000.00', '2016-04-24 21:17:40', '2016-04-19 13:26:01'),
(3, 1, NULL, '12579.09', '12579.09', '2016-04-19 13:26:56', '2016-04-19 13:26:56'),
(4, 3, '60 sec', '11310.90', '11310.90', '2016-04-19 22:16:11', '2016-04-19 22:16:11'),
(5, 3, '45 sec', '9862.90', '9862.90', '2016-04-19 22:17:08', '2016-04-19 22:17:08'),
(6, 3, '30 sec', '8445.90', '8445.90', '2016-04-19 22:17:36', '2016-04-19 22:17:36'),
(7, 3, '15 sec', '7770.90', '7770.90', '2016-04-19 22:18:02', '2016-04-19 22:18:02'),
(8, 3, '5 sec', '4770.90', '4770.90', '2016-04-19 22:18:23', '2016-04-19 22:18:23'),
(9, 24, '60 sec', '16966.35', '16966.35', '2016-04-19 22:19:50', '2016-04-19 22:19:50'),
(10, 24, '45 sec', '14794.35', '14794.35', '2016-04-19 22:20:37', '2016-04-19 22:20:37'),
(11, 24, '30 sec', '12668.85', '12668.85', '2016-04-19 22:21:12', '2016-04-19 22:21:12'),
(12, 24, '15 sec', '11656.35', '11656.35', '2016-04-19 22:21:34', '2016-04-19 22:21:34'),
(13, 24, '5 sec', '7156.35', '7156.35', '2016-04-19 22:21:55', '2016-04-19 22:21:55'),
(14, 4, '60 min', '29295.00', '26368.50', '2016-04-19 22:23:16', '2016-04-19 22:23:16'),
(15, 4, '45 min', '24367.50', '21935.25', '2016-04-19 22:23:58', '2016-04-19 22:23:58'),
(16, 4, '30 min', '16395.00', '14758.50', '2016-04-19 23:26:37', '2016-04-19 22:26:37'),
(17, 4, '15 min', '11542.50', '10392.75', '2016-04-19 22:27:04', '2016-04-19 22:27:04'),
(18, 4, '10 min', '9234.00', '8314.20', '2016-04-19 22:27:40', '2016-04-19 22:27:40'),
(19, 4, '5 min', '7387.20', '6651.36', '2016-04-19 22:28:34', '2016-04-19 22:28:34'),
(20, 5, '60 min', '225000.90', '202500.90', '2016-06-19 16:43:12', '2016-06-19 15:43:12'),
(21, 5, '45 min', '202950.90', '182655.90', '2016-06-19 16:44:13', '2016-06-19 15:44:13'),
(22, 5, '30 min', '180900.90', '162810.90', '2016-06-19 16:45:25', '2016-06-19 15:45:25'),
(23, 5, '15 min', '158850.90', '142965.90', '2016-06-19 16:46:19', '2016-06-19 15:46:19'),
(24, 5, '10 min', '135900.90', '131055.90', '2016-06-19 16:47:15', '2016-06-19 15:47:15'),
(25, 5, '5 min', '101925.90', '98291.90', '2016-06-19 16:41:38', '2016-06-19 15:41:38'),
(26, 6, '60 min', '40500.00', '36450.00', '2016-04-19 22:32:52', '2016-04-19 22:32:52'),
(27, 6, '45 min', '30375.00', '27337.50', '2016-04-19 22:33:30', '2016-04-19 22:33:30'),
(28, 6, '30 min', '25312.50', '22783.75', '2016-04-19 22:34:08', '2016-04-19 22:34:08'),
(29, 6, '15 min', '17212.50', '15493.75', '2016-04-19 22:34:41', '2016-04-19 22:34:41'),
(30, 6, '5 min', '10125.00', '9112.50', '2016-04-19 22:35:05', '2016-04-19 22:35:05'),
(31, 7, '60 min', '8990.00', '8990.00', '2016-04-19 22:35:49', '2016-04-19 22:35:49'),
(32, 7, '45 min', '7650.00', '7650.00', '2016-04-19 22:36:28', '2016-04-19 22:36:28'),
(33, 7, '30 min', '6750.00', '6750.00', '2016-04-19 22:37:00', '2016-04-19 22:37:00'),
(34, 7, '15 min', '5650.00', '5650.00', '2016-04-19 22:37:23', '2016-04-19 22:37:23'),
(35, 7, '5 min', '4550.00', '4550.00', '2016-04-19 22:37:43', '2016-04-19 22:37:43'),
(41, 9, '60 min', '288750.00', '288750.00', '2016-05-03 08:31:07', '2016-04-19 22:41:27'),
(42, 10, '60 min', '260750.00', '260750.00', '2016-06-19 16:51:45', '2016-06-19 15:51:45'),
(43, 11, '1-50 Words', '1417.90', '1295.90', '2016-04-19 22:43:32', '2016-04-19 22:43:32'),
(44, 11, '51-75 Words', '1822.90', '1671.90', '2016-04-19 22:44:50', '2016-04-19 22:44:50'),
(45, 11, '76-100 Words', '2025.90', '1822.90', '2016-04-19 22:45:19', '2016-04-19 22:45:19'),
(49, 13, '60 min', '58492.90', '52647.90', '2016-04-19 22:48:25', '2016-04-19 22:48:25'),
(50, 13, '45 min', '49425.90', '44482.90', '2016-04-19 22:48:49', '2016-04-19 22:48:49'),
(51, 13, '30 min', '38775.90', '34963.90', '2016-04-19 22:49:35', '2016-04-19 22:49:35'),
(52, 13, '15 min', '26625.90', '24375.90', '2016-04-19 22:50:01', '2016-04-19 22:50:01'),
(53, 13, '5 min', '15825.90', '15075.90', '2016-04-19 22:50:27', '2016-04-19 22:50:27'),
(54, 14, '1-60 Words', '2531.90', '2334.90', '2016-04-19 22:51:21', '2016-04-19 22:51:21'),
(55, 14, '61-80 Words', '3341.90', '3027.90', '2016-04-19 22:51:53', '2016-04-19 22:51:53'),
(56, 14, '81-100 Words', '3948.90', '3584.90', '2016-04-19 22:52:23', '2016-04-19 22:52:23'),
(60, 16, '60 sec', '18465.90', '18465.90', '2016-04-19 22:54:47', '2016-04-19 22:54:47'),
(61, 16, '45 sec', '16710.90', '16710.90', '2016-04-19 22:55:05', '2016-04-19 22:55:05'),
(62, 16, '30 sec', '14887.90', '14887.90', '2016-04-19 22:55:57', '2016-04-19 22:55:57'),
(63, 16, '1-60 Words', '9900.90', '9900.90', '2016-04-19 22:56:37', '2016-04-19 22:56:37'),
(64, 16, '61-80 Words', '10575.90', '10575.90', '2016-04-19 22:57:00', '2016-04-19 22:57:00'),
(65, 16, '81-100 Words', '11587.90', '11587.90', '2016-04-19 22:57:30', '2016-04-19 22:57:30'),
(66, 17, '60 min', '50590.00', '50590.00', '2016-04-20 00:00:12', '2016-04-19 23:00:12'),
(67, 18, '60 min', '38590.00', '38590.00', '2016-04-19 22:59:16', '2016-04-19 22:59:16'),
(69, 19, NULL, '15187.90', '15187.90', '2016-04-19 23:02:06', '2016-04-19 23:02:06'),
(70, 20, NULL, '30375.90', '30375.90', '2016-04-19 23:02:58', '2016-04-19 23:02:58'),
(71, 21, NULL, '40000.00', '40000.00', '2016-04-19 23:03:34', '2016-04-19 23:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `timeable` tinyint(1) NOT NULL DEFAULT '0',
  `fixable` tinyint(1) NOT NULL DEFAULT '0',
  `surcharge` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `timeable`, `fixable`, `surcharge`, `created_at`, `updated_at`) VALUES
(1, 'Time Check', 0, 0, 50, '2016-07-03 21:12:44', '2016-04-19 10:08:39'),
(2, 'Hypes', 0, 0, 50, '2016-07-03 21:12:17', '2016-04-19 10:09:39'),
(3, 'Spot placement/R.O.S', 1, 1, 50, '2016-07-03 20:12:49', '2016-04-19 10:10:20'),
(4, 'Programme sponsorship airtime only', 1, 0, 50, '2016-07-03 20:29:27', '2016-04-19 10:11:12'),
(5, 'Programme sponsorship (Political/DBS/SPECIAL)', 1, 0, 50, '2016-07-03 20:29:45', '2016-04-19 10:11:40'),
(6, 'Programme sponsorship (Product)', 1, 0, 50, '2016-07-03 20:29:49', '2016-04-19 10:12:16'),
(7, 'Programme sponsorship (Religious, Recorded, NON-Product)', 1, 0, 50, '2016-07-03 20:29:54', '2016-04-19 10:12:49'),
(9, 'Rally convention live per hour', 1, 0, 50, '2016-07-03 20:29:58', '2016-04-19 10:13:38'),
(10, 'Rally convention recorded per hour', 1, 0, 50, '2016-07-03 20:30:01', '2016-04-19 10:14:06'),
(11, 'Personal paid announcement', 1, 1, 50, '2016-07-03 19:33:51', '2016-04-19 10:14:37'),
(13, 'Studio appearance', 1, 0, 50, '2016-07-03 20:30:06', '2016-04-19 10:15:50'),
(14, 'Obituary/Immemorial/Religious announcement', 1, 0, 50, '2016-07-03 20:30:13', '2016-04-19 10:16:13'),
(16, 'Political Rates', 1, 1, 50, '2016-07-03 19:34:00', '2016-06-19 17:26:39'),
(17, 'Religious coverage live', 1, 1, 100, '2016-07-03 20:13:02', '2016-04-19 10:18:27'),
(18, 'Religious coverage recorded (Revival, Crusade ETC)', 1, 0, 50, '2016-07-03 20:30:18', '2016-04-19 10:18:53'),
(19, 'News Item/Promo', 0, 1, 50, '2016-07-03 19:34:07', '2016-04-19 10:19:28'),
(20, 'News coverage', 0, 1, 50, '2016-07-03 19:34:36', '2016-04-19 10:19:47'),
(21, 'News sponsorship', 0, 1, 50, '2016-07-03 19:34:12', '2016-04-19 10:20:14'),
(24, 'Spot placement/R.O.S.', 1, 0, 50, '2016-07-03 20:30:23', '2016-04-19 10:23:26');

-- --------------------------------------------------------

--
-- Table structure for table `product_times`
--

CREATE TABLE `product_times` (
  `id` int(10) UNSIGNED NOT NULL,
  `premium_start` time NOT NULL,
  `premium_end` time NOT NULL,
  `regular_start` time NOT NULL,
  `regular_end` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product_times`
--

INSERT INTO `product_times` (`id`, `premium_start`, `premium_end`, `regular_start`, `regular_end`, `created_at`, `updated_at`) VALUES
(1, '00:00:00', '23:59:00', '12:00:00', '15:30:00', '2016-09-21 07:28:54', '2016-09-21 07:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `promocodes`
--

CREATE TABLE `promocodes` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `reward` double(10,2) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT '-1',
  `expiry_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `promocodes`
--

INSERT INTO `promocodes` (`id`, `code`, `reward`, `type`, `quantity`, `expiry_date`, `created_at`, `updated_at`) VALUES
(1, 'TT3D-4SQU', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(2, 'WP42-TY37', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(3, '10D4-0760', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(4, 'MLCE-7KCG', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(5, 'NUPW-XY3M', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(6, 'X4WA-KCJC', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(7, 'ZAZT-SPFX', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(8, 'AK4A-9FCR', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(9, '7NBV-EZ7D', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(10, 'XCX7-FCNT', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(11, 'JEAV-QVYC', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(12, 'M08M-AAD7', 7.00, 'COUPON', 1, NULL, '2016-09-29 15:29:52', '2017-05-29 11:36:13'),
(13, 'YDJ8-C97P', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(14, '0WPG-3SSL', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(15, 'G3ME-3N46', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(16, '9SFJ-A4U2', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(17, 'DSEN-RNY4', 7.00, 'COUPON', 4, NULL, '2016-09-29 15:29:52', '2016-09-29 15:29:52'),
(18, 'ZC8D-PG8T', 5.00, 'DISCOUNT', 5, NULL, '2016-09-29 16:55:36', '2016-09-29 16:55:36'),
(19, 'KCZZ-S5PB', 5.00, 'DISCOUNT', 5, NULL, '2016-09-29 16:55:36', '2016-09-29 16:55:36'),
(20, 'P3VN-M2S1', 5.00, 'DISCOUNT', 5, NULL, '2016-09-29 16:55:36', '2016-09-29 16:55:36'),
(21, 'SYL1-MXSB', 5.00, 'DISCOUNT', 4, NULL, '2016-09-29 16:55:36', '2016-10-03 15:10:46'),
(22, '2Z54-FSSE', 5.00, 'DISCOUNT', 5, NULL, '2016-09-29 16:55:36', '2016-09-29 16:55:36'),
(23, 'GETF-SQ8B', 15.00, 'DISCOUNT', 1, NULL, '2016-09-29 17:37:21', '2016-09-29 18:26:16'),
(24, 'JCA7-L62T', 15.00, 'DISCOUNT', 1, NULL, '2016-09-29 17:37:21', '2016-09-29 18:46:30'),
(25, 'QFJA-RYGA', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(26, '5G6F-A6B5', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(27, '5E66-LLBE', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(28, 'GSQ7-DX5A', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(29, 'E0SV-2F7T', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(30, 'N86C-3TGM', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(31, 'GTPL-WBL6', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(32, '304R-QNMQ', 15.00, 'DISCOUNT', 2, NULL, '2016-09-29 17:37:21', '2016-09-29 17:37:21'),
(33, 'RE6X-ARZT', 10.00, 'DISCOUNT', 5, NULL, '2016-09-30 18:56:37', '2016-09-30 18:56:37'),
(34, 'HNBQ-J6CJ', 10.00, 'DISCOUNT', 5, NULL, '2016-09-30 18:56:37', '2016-09-30 18:56:37'),
(35, 'NEQY-S5S1', 10.00, 'DISCOUNT', 5, NULL, '2016-09-30 18:56:37', '2016-09-30 18:56:37'),
(36, '1ZNA-4WJH', 10.00, 'DISCOUNT', 5, NULL, '2016-09-30 18:56:37', '2016-09-30 18:56:37'),
(37, '52M0-RWWQ', 10.00, 'DISCOUNT', 5, NULL, '2016-09-30 18:56:37', '2016-09-30 18:56:37'),
(38, 'FT3T-VJF4', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(39, 'X4UT-BU4W', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(40, 'DWYA-FYCG', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(41, 'SY4L-25QW', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(42, 'LL44-N8D0', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(43, '2RNM-BLXZ', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(44, 'ZRBH-QX1N', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(45, 'S2X0-D1BW', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(46, 'VG8H-0LJH', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(47, 'PSFS-3HFV', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(48, 'JH2Z-G3ZR', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:10', '2017-05-22 09:21:10'),
(49, 'YL6L-T60Q', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(50, '3XER-3KAE', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(51, 'CLFH-HXRC', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(52, '7LVZ-WHA7', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(53, 'FLAR-A483', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(54, 'V5UY-YKY3', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(55, 'HDRA-G9UY', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(56, 'D02Z-50VB', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(57, 'KJQR-Y8GJ', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(58, '31P8-E11X', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(59, 'FDWG-52VZ', 11.00, 'DISCOUNT', 4, NULL, '2017-05-22 09:21:16', '2017-05-22 09:21:16'),
(60, '7A74-VGJ7', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(61, 'FTH9-C18V', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(62, 'HM3B-5ASG', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(63, 'BWS5-NWTC', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(64, 'DYC9-RKM3', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(65, 'YB68-T07B', 3.00, 'COUPON', 4, NULL, '2017-06-09 10:09:05', '2017-06-09 10:09:05'),
(66, 'XH2Y-J5H9', 3.00, 'COUPON', 2, NULL, '2017-06-09 10:09:34', '2017-06-09 10:09:34'),
(67, '2MVG-ZGAU', 3.00, 'COUPON', 2, NULL, '2017-06-09 10:09:34', '2017-06-09 10:09:34'),
(68, 'XDH7-ENRN', 3.00, 'COUPON', 2, NULL, '2017-06-09 10:09:34', '2017-06-09 10:09:34'),
(69, 'JM05-0UA9', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:39', '2017-06-09 10:10:39'),
(70, 'YESB-C8WY', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(71, 'Q6AU-5EPE', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(72, 'Z1ES-SS15', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(73, 'CW0B-Z32H', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(74, 'KJKK-L7DQ', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(75, 'DUHW-4B4N', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40'),
(76, 'S13A-PBLP', 4.00, 'COUPON', 5, '2017-06-30 00:00:00', '2017-06-09 10:10:40', '2017-06-09 10:10:40');

-- --------------------------------------------------------

--
-- Table structure for table `remittances`
--

CREATE TABLE `remittances` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `target_id` int(10) UNSIGNED NOT NULL,
  `client` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `remittances`
--

INSERT INTO `remittances` (`id`, `report_id`, `target_id`, `client`, `amount`, `created_at`, `updated_at`) VALUES
(1, 13, 1, 'guygygj', '3049', '2017-06-01 21:46:34', '2017-06-01 21:46:34'),
(2, 14, 1, 'guygygj', '3049', '2017-06-01 21:47:03', '2017-06-01 21:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 10, '2016-08-08 07:39:05', '2016-08-08 07:39:05'),
(2, 10, '2016-08-08 07:39:09', '2016-08-08 07:39:09'),
(3, 10, '2016-08-08 07:39:33', '2016-08-08 07:39:33'),
(4, 1, '2017-04-26 06:31:01', '2017-04-26 06:31:01'),
(5, 1, '2017-04-26 06:31:04', '2017-04-26 06:31:04'),
(6, 1, '2017-04-26 06:31:30', '2017-04-26 06:31:30'),
(7, 1, '2017-06-01 21:29:32', '2017-06-01 21:29:32'),
(8, 1, '2017-06-01 21:29:57', '2017-06-01 21:29:57'),
(9, 1, '2017-06-01 21:30:30', '2017-06-01 21:30:30'),
(10, 1, '2017-06-01 21:30:55', '2017-06-01 21:30:55'),
(11, 1, '2017-06-01 21:38:24', '2017-06-01 21:38:24'),
(12, 1, '2017-06-01 21:38:27', '2017-06-01 21:38:27'),
(13, 1, '2017-06-01 21:46:34', '2017-06-01 21:46:34'),
(14, 1, '2017-06-01 21:47:03', '2017-06-01 21:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `report_uploads`
--

CREATE TABLE `report_uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `filepath` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `report_uploads`
--

INSERT INTO `report_uploads` (`id`, `report_id`, `filename`, `filepath`, `mime`, `created_at`, `updated_at`) VALUES
(1, 13, 'staff/reports/Zc7ynyAoyXTH6wqdgjuYFI4QQ1FCoP0W1YTmmwbg.jpeg', NULL, NULL, '2017-06-01 21:46:34', '2017-06-01 21:46:34'),
(2, 13, 'staff/reports/VSXE5zYDgVBN2LRTTpgqq9PgLTgP15FzY2gQSeQa.png', NULL, NULL, '2017-06-01 21:46:34', '2017-06-01 21:46:34'),
(3, 14, 'staff/reports/TTpAKeJ730A4xq5013OfpMaVBJ4AEcfDFdtCvAni.jpeg', NULL, NULL, '2017-06-01 21:47:03', '2017-06-01 21:47:03'),
(4, 14, 'staff/reports/gPMOK32XiZpxPYhFdtHwoeQ0hGbjbCwu9aQKJzQx.png', NULL, NULL, '2017-06-01 21:47:03', '2017-06-01 21:47:03');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `level` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `level`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin', '', 1, '2016-06-01 00:37:56', '2016-06-01 00:37:56'),
(2, 'Traffic', 'traffic', NULL, 1, '2016-06-01 01:02:14', '2016-06-01 01:02:14'),
(4, 'Executive Director', 'executive.director', NULL, 1, '2016-06-01 01:03:28', '2016-06-01 01:03:28'),
(5, 'ICT', 'ict', NULL, 1, '2016-06-01 01:04:43', '2016-06-01 01:04:43'),
(6, 'Marketing', 'marketing', NULL, 1, '2016-06-01 01:05:01', '2016-06-01 01:05:01'),
(7, 'Accounting', 'accounting', NULL, 1, '2016-06-01 01:05:15', '2016-06-01 01:05:15'),
(8, 'Administration Dept', 'administration.dept', NULL, 1, '2016-06-01 01:05:50', '2016-06-01 01:05:50'),
(9, 'Programmes Dept', 'programmes.dept', NULL, 1, '2016-06-01 01:06:15', '2016-06-01 01:06:15'),
(10, 'Head of Accounting', 'head.accounting', NULL, 1, '2016-06-01 01:07:15', '2016-06-01 01:07:15'),
(11, 'Head of Marketing', 'head.marketing', NULL, 1, '2016-06-01 01:07:39', '2016-06-01 01:07:39'),
(12, 'News', 'news', NULL, 1, '2016-07-16 08:15:50', '2016-07-16 08:15:50'),
(13, 'Engineering', 'engineering', NULL, 1, '2016-07-16 08:16:29', '2016-07-16 08:16:29'),
(14, 'Driver', 'driver', NULL, 1, '2016-07-16 08:16:42', '2016-07-16 08:16:42'),
(15, 'Staff', 'staff', NULL, 1, '2016-07-16 08:18:08', '2016-07-16 08:18:08'),
(16, 'Supervisor', 'supervisor', NULL, 1, '2016-07-16 08:18:31', '2016-07-16 08:18:31');

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`id`, `role_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2016-07-31 10:04:27', '2016-07-31 10:04:27'),
(28, 2, 1, '2016-07-31 23:56:29', '2016-07-31 23:56:29'),
(29, 4, 1, '2016-07-31 23:56:29', '2016-07-31 23:56:29'),
(30, 5, 1, '2016-07-31 23:56:29', '2016-07-31 23:56:29'),
(77, 2, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(79, 5, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(83, 9, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(89, 15, 10, '2016-08-03 11:51:07', '2016-08-03 11:51:07'),
(93, 5, 12, '2016-08-03 13:24:22', '2016-08-03 13:24:22'),
(94, 15, 12, '2016-08-03 13:24:22', '2016-08-03 13:24:22'),
(95, 1, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(96, 4, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(97, 15, 14, '2016-09-06 11:59:22', '2016-09-06 11:59:22'),
(117, 1, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(118, 2, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(119, 4, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(120, 5, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(121, 6, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(122, 7, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(123, 8, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(124, 9, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(125, 10, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(126, 11, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(127, 12, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(128, 13, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(129, 14, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(130, 15, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(131, 16, 15, '2016-09-13 13:50:11', '2016-09-13 13:50:11'),
(145, 15, 16, '2016-09-13 13:54:25', '2016-09-13 13:54:25'),
(147, 2, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(148, 5, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(149, 6, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(150, 7, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(151, 8, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(152, 9, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(153, 10, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(154, 11, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(155, 12, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(156, 13, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(157, 14, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(158, 16, 14, '2016-09-17 16:19:09', '2016-09-17 16:19:09'),
(159, 9, 17, '2016-09-23 11:06:11', '2016-09-23 11:06:11'),
(161, 15, 18, '2016-09-23 13:45:19', '2016-09-23 13:45:19'),
(162, 1, 18, '2017-05-30 07:39:40', '2017-05-30 07:39:40'),
(163, 5, 18, '2017-05-30 07:39:58', '2017-05-30 07:39:58'),
(182, 9, 19, '2017-05-30 08:14:34', '2017-05-30 08:14:34'),
(183, 10, 19, '2017-05-30 08:14:34', '2017-05-30 08:14:34'),
(184, 11, 19, '2017-05-30 08:14:34', '2017-05-30 08:14:34'),
(185, 12, 19, '2017-05-30 08:14:34', '2017-05-30 08:14:34'),
(190, 6, 1, '2017-05-30 08:16:48', '2017-05-30 08:16:48'),
(191, 7, 1, '2017-05-30 08:16:48', '2017-05-30 08:16:48'),
(192, 8, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(193, 9, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(194, 10, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(195, 11, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(196, 12, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(197, 13, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(198, 14, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(199, 15, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49'),
(200, 16, 1, '2017-05-30 08:16:49', '2017-05-30 08:16:49');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_no` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `marketer_id` int(11) UNSIGNED DEFAULT NULL,
  `promocode` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `discount` int(11) NOT NULL,
  `discountAmt` decimal(12,2) NOT NULL,
  `commission` int(11) NOT NULL,
  `commissionAmt` decimal(12,2) NOT NULL,
  `subTotal` decimal(12,2) NOT NULL,
  `grandTotal` decimal(12,2) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `order_no`, `user_id`, `client_id`, `marketer_id`, `promocode`, `discount`, `discountAmt`, `commission`, `commissionAmt`, `subTotal`, `grandTotal`, `deleted_at`, `created_at`, `updated_at`) VALUES
(41, 'JA0000000041', 1, 1, NULL, 'a:2:{s:8:"discount";N;s:6:"coupon";N;}', 0, '0.00', 0, '0.00', '131827.50', '138418.88', NULL, '2017-01-10 08:12:26', '2017-01-10 08:12:26'),
(42, 'JA0000000042', 1, 1, NULL, 'a:2:{s:8:"discount";N;s:6:"coupon";N;}', 0, '0.00', 0, '0.00', '75474.54', '79248.27', NULL, '2017-01-10 08:35:12', '2017-01-10 08:35:13'),
(44, 'MY0000000044', 1, 1, NULL, 'a:2:{s:8:"discount";N;s:6:"coupon";s:9:"M08M-AAD7";}', 0, '0.00', 7, '2800.00', '40000.00', '39200.00', NULL, '2017-05-24 09:19:01', '2017-05-24 09:19:01'),
(88, 'MY0000000088', 1, 48, 1, 's:38:"{"discount":null,"coupon":"M08M-AAD7"}";', 0, '0.00', 7, '2200707.60', '31438679.98', '30809906.38', NULL, '2017-05-29 11:36:12', '2017-05-29 11:36:13'),
(89, 'MY0000000089', 1, 48, 15, 's:31:"{"discount":null,"coupon":null}";', 0, '0.00', 0, '0.00', '157238.63', '165100.56', NULL, '2017-05-29 16:24:31', '2017-05-29 16:24:31');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_alerts`
--

CREATE TABLE `schedule_alerts` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule_id` int(10) UNSIGNED NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  `approved_by` int(10) UNSIGNED DEFAULT NULL,
  `approved_signed` timestamp NULL DEFAULT NULL,
  `validate` tinyint(1) NOT NULL DEFAULT '0',
  `validated_by` int(10) UNSIGNED DEFAULT NULL,
  `validate_signed` timestamp NULL DEFAULT NULL,
  `recommend` tinyint(1) NOT NULL DEFAULT '0',
  `recommended_by` int(10) UNSIGNED DEFAULT NULL,
  `recommend_signed` timestamp NULL DEFAULT NULL,
  `programme` tinyint(1) NOT NULL DEFAULT '0',
  `programmed_by` int(10) UNSIGNED DEFAULT NULL,
  `programme_signed` timestamp NULL DEFAULT NULL,
  `mail` int(11) NOT NULL DEFAULT '0',
  `sent_at` timestamp NULL DEFAULT NULL,
  `resend_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedule_alerts`
--

INSERT INTO `schedule_alerts` (`id`, `schedule_id`, `approved`, `approved_by`, `approved_signed`, `validate`, `validated_by`, `validate_signed`, `recommend`, `recommended_by`, `recommend_signed`, `programme`, `programmed_by`, `programme_signed`, `mail`, `sent_at`, `resend_at`, `token`, `created_at`, `updated_at`) VALUES
(34, 41, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, '$2y$10$wmKnddERwr1bwG32n0hcVeTJoDlz7hVO9.pnPAzYZYicnKZNSwgpC', '2017-01-10 08:12:26', '2017-01-10 08:12:26'),
(35, 42, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, '$2y$10$Zr5dyfRxzEnHlcMpE49giukqS1hsbgHqr0mAuwITvJmM4Pje5gAEG', '2017-01-10 08:35:13', '2017-01-10 08:35:13'),
(36, 44, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, '$2y$10$4ow9CUFDPXeXwDnH2ld2rOrBvgkEUhAfqt6BKmKGNIttEScUL6ngO', '2017-05-24 09:19:01', '2017-05-24 09:19:01'),
(42, 88, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, '$2y$10$S6ZAPJn.7trzPi4aeNhvc.i3/g.CY2W3o9DM0TPZzzNn0QkuhA3bW', '2017-05-29 11:36:13', '2017-05-29 11:36:13'),
(43, 89, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, 0, NULL, NULL, '$2y$10$Hlm8M.U721RSZS0is.lIaOaAbWJerG4UI7E5gObce/PvKFzp1dJba', '2017-05-29 16:24:31', '2017-05-29 16:24:31');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_products`
--

CREATE TABLE `schedule_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `subscriptions` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedule_products`
--

INSERT INTO `schedule_products` (`id`, `schedule_id`, `product_id`, `subscriptions`, `created_at`, `updated_at`) VALUES
(61, 41, 4, '', '2017-01-10 08:12:26', '2017-01-10 08:12:26'),
(62, 42, 1, '', '2017-01-10 08:35:12', '2017-01-10 08:35:12'),
(63, 44, 2, '', '2017-05-24 09:19:01', '2017-05-24 09:19:01'),
(76, 88, 1, 'a:2:{i:0;O:8:"stdClass":13:{s:6:"period";s:7:"premium";s:5:"slots";s:1:"1";s:8:"duration";N;s:15:"slot_start_date";s:15:"Mon May 29 2017";s:13:"slot_end_date";s:15:"Mon May 29 2017";s:7:"isFixed";b:0;s:9:"schedules";a:0:{}s:7:"product";i:1;s:13:"product_index";s:1:"0";s:7:"file_id";s:67:"airtime/subscriptions/Ie4tO2xGUsb8HCDN1tF5P5AIsO4FXTiKdZFq4PcZ.jpeg";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";d:12579.09;}i:1;O:8:"stdClass":13:{s:6:"period";s:7:"premium";s:5:"slots";s:1:"1";s:8:"duration";N;s:15:"slot_start_date";s:15:"Mon May 29 2017";s:13:"slot_end_date";s:15:"Mon May 29 2017";s:7:"isFixed";b:0;s:9:"schedules";a:0:{}s:7:"product";i:1;s:13:"product_index";s:1:"0";s:7:"file_id";N;s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";d:12579.09;}}', '2017-05-29 11:36:13', '2017-05-29 11:36:13'),
(77, 88, 3, 'a:2:{i:0;O:8:"stdClass":11:{s:7:"product";i:3;s:6:"period";s:7:"premium";s:8:"duration";s:6:"60 sec";s:5:"bulks";i:501;s:15:"bulk_start_date";s:15:"Mon May 29 2017";s:13:"bulk_end_date";s:15:"Mon May 29 2017";s:13:"product_index";s:1:"2";s:7:"file_id";s:66:"airtime/subscriptions/Zh86tqXvOC8R1tKTEajhSqmGcV0Is1V8nozqqNu1.png";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";d:5666760.9000000004;}i:1;O:8:"stdClass":11:{s:7:"product";i:3;s:6:"period";s:7:"premium";s:8:"duration";s:6:"60 sec";s:5:"bulks";i:501;s:15:"bulk_start_date";s:15:"Mon May 29 2017";s:13:"bulk_end_date";s:15:"Mon May 29 2017";s:13:"product_index";s:1:"2";s:7:"file_id";s:67:"airtime/subscriptions/9bzKBYaoiIYpBwn2r9cJ94teOfiExxTRUHONjle0.jpeg";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";d:5666760.9000000004;}}', '2017-05-29 11:36:13', '2017-05-29 11:36:13'),
(78, 88, 21, 'a:2:{i:0;O:8:"stdClass":11:{s:7:"product";i:21;s:6:"period";s:7:"premium";s:8:"duration";N;s:5:"bulks";i:501;s:15:"bulk_start_date";s:15:"Mon May 29 2017";s:13:"bulk_end_date";s:15:"Mon May 29 2017";s:13:"product_index";s:2:"17";s:7:"file_id";s:66:"airtime/subscriptions/EHgZfvGNmiUASndlPGhTYURGJxzZuyTkpcGD75yh.png";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";i:20040000;}i:1;O:8:"stdClass":13:{s:6:"period";s:7:"premium";s:5:"slots";s:1:"1";s:8:"duration";N;s:15:"slot_start_date";s:15:"Mon May 29 2017";s:13:"slot_end_date";s:15:"Mon May 29 2017";s:7:"isFixed";b:0;s:9:"schedules";a:0:{}s:7:"product";i:21;s:13:"product_index";s:2:"17";s:7:"file_id";s:66:"airtime/subscriptions/XIuuXxmKQeJxUWYc7eLz60ZqXWlctg8alVHsg5HN.png";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";i:40000;}}', '2017-05-29 11:36:13', '2017-05-29 11:36:13'),
(79, 89, 1, 'a:1:{i:0;O:8:"stdClass":13:{s:6:"period";s:7:"premium";s:5:"slots";s:2:"10";s:8:"duration";N;s:15:"slot_start_date";s:15:"Mon May 29 2017";s:13:"slot_end_date";s:15:"Sat Jun 10 2017";s:7:"isFixed";b:1;s:9:"schedules";a:3:{i:0;O:8:"stdClass":3:{s:4:"date";s:15:"Mon May 29 2017";s:5:"going";s:1:"2";s:8:"fixtimes";a:2:{i:0;s:10:"6:24:00 PM";i:1;s:10:"6:25:00 PM";}}i:1;O:8:"stdClass":3:{s:4:"date";s:15:"Tue May 30 2017";s:5:"going";s:1:"4";s:8:"fixtimes";a:0:{}}i:2;O:8:"stdClass":3:{s:4:"date";s:15:"Wed May 31 2017";s:5:"going";s:1:"4";s:8:"fixtimes";a:3:{i:0;s:10:"6:25:00 PM";i:1;s:10:"6:28:00 PM";i:2;s:10:"6:29:00 PM";}}}s:7:"product";i:1;s:13:"product_index";s:1:"0";s:7:"file_id";s:67:"airtime/subscriptions/AZLIa3S3hM5Hic4TxoNWhz4s04qkA7Cz8K2JoSra.jpeg";s:10:"prog_start";s:11:"12:00:00 AM";s:8:"prog_end";s:11:"11:59:00 PM";s:6:"amount";d:157238.63;}}', '2017-05-29 16:24:31', '2017-05-29 16:24:31');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_product_subs`
--

CREATE TABLE `schedule_product_subs` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule_product_id` int(10) UNSIGNED NOT NULL,
  `subscription` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedule_product_subs`
--

INSERT INTO `schedule_product_subs` (`id`, `schedule_product_id`, `subscription`, `created_at`, `updated_at`) VALUES
(78, 61, 'a:7:{s:5:"slots";s:1:"3";s:15:"slot_start_date";s:24:"2017-01-12T23:00:00.000Z";s:13:"slot_end_date";s:24:"2017-01-19T23:00:00.000Z";s:18:"isFixedOrDisplaced";b:1;s:6:"period";s:7:"premium";s:8:"duration";s:6:"60 min";s:6:"amount";d:131827.5;}', '2017-01-10 08:12:26', '2017-01-10 08:12:26'),
(79, 62, 'a:8:{s:5:"slots";s:1:"6";s:15:"slot_start_date";s:24:"2017-01-10T23:00:00.000Z";s:13:"slot_end_date";s:24:"2017-01-30T23:00:00.000Z";s:18:"isFixedOrDisplaced";b:0;s:6:"period";s:7:"premium";s:8:"duration";N;s:6:"amount";d:75474.540000000008;s:8:"schedule";a:0:{}}', '2017-01-10 08:35:13', '2017-01-10 08:35:13'),
(80, 63, 'a:9:{s:10:"attachment";a:0:{}s:5:"slots";s:1:"1";s:15:"slot_start_date";s:24:"2017-05-23T23:00:00.000Z";s:13:"slot_end_date";s:24:"2017-05-25T23:00:00.000Z";s:18:"isFixedOrDisplaced";b:0;s:6:"period";s:7:"premium";s:8:"duration";N;s:6:"amount";i:40000;s:8:"schedule";a:0:{}}', '2017-05-24 09:19:01', '2017-05-24 09:19:01');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_product_sub_details`
--

CREATE TABLE `schedule_product_sub_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule_product_sub_id` int(10) UNSIGNED NOT NULL,
  `schedule` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `schedule_product_sub_details`
--

INSERT INTO `schedule_product_sub_details` (`id`, `schedule_product_sub_id`, `schedule`, `created_at`, `updated_at`) VALUES
(16, 78, 'a:3:{i:0;a:4:{s:4:"slot";s:1:"1";s:4:"date";s:24:"2017-01-12T23:00:00.000Z";s:5:"times";a:1:{i:0;s:24:"1969-12-31T23:11:00.000Z";}s:5:"tofix";s:1:"1";}i:1;a:4:{s:4:"slot";s:1:"1";s:4:"date";s:24:"2017-01-13T23:00:00.000Z";s:5:"times";a:1:{i:0;s:24:"1969-12-31T23:10:00.000Z";}s:5:"tofix";s:1:"1";}i:2;a:4:{s:4:"slot";s:1:"1";s:4:"date";s:24:"2017-01-14T23:00:00.000Z";s:5:"times";a:1:{i:0;s:24:"1969-12-31T23:11:00.000Z";}s:5:"tofix";s:1:"1";}}', '2017-01-10 08:12:26', '2017-01-10 08:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `field` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(4) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription_attachments`
--

CREATE TABLE `subscription_attachments` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule` int(10) UNSIGNED NOT NULL,
  `schedule_product_sub` int(10) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `filesize` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `filetype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `subscription_attachments`
--

INSERT INTO `subscription_attachments` (`id`, `schedule`, `schedule_product_sub`, `filename`, `filesize`, `filetype`, `created_at`, `updated_at`) VALUES
(3, 41, 78, 'b4a2f3cc2a9eba89621fea933eaa38bbb10d1a7f.png', '8128', 'image/png', '2017-01-10 08:12:26', '2017-01-10 08:12:26'),
(4, 42, 79, '3a85f262c27e5a635a51736398d31e02a8592e4b.png', '3277', 'image/png', '2017-01-10 08:35:13', '2017-01-10 08:35:13'),
(5, 42, 79, '1522b2d6e33a599fcaa9eb687a04c9e8374b9eed.jpg', '1372000', 'image/jpeg', '2017-01-10 08:35:13', '2017-01-10 08:35:13');

-- --------------------------------------------------------

--
-- Table structure for table `targets`
--

CREATE TABLE `targets` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `duration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `marketer` int(10) UNSIGNED NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `targets`
--

INSERT INTO `targets` (`id`, `name`, `start_date`, `duration`, `user_id`, `marketer`, `amount`, `created_at`, `updated_at`) VALUES
(1, 'dfnjio', '2017-05-30 22:13:31', '30', 14, 1, '3049.00', '2017-05-30 09:57:29', '2017-05-30 11:01:37'),
(2, 'ewkjiljol', '2017-05-30 22:16:50', '23', 1, 1, '365049.00', '2017-05-30 10:42:45', '2017-05-30 11:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `htmlText` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `grade` char(1) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `report_id`, `completed`, `htmlText`, `created_at`, `updated_at`, `grade`) VALUES
(1, 1, 1, '<p>hi</p>', '2016-08-08 07:39:05', '2016-08-08 07:39:05', NULL),
(2, 2, 1, '<p>hi</p>', '2016-08-08 07:39:09', '2016-08-08 07:39:09', NULL),
(3, 3, 1, '<p>testing account</p>', '2016-08-08 07:39:33', '2016-08-08 07:39:33', NULL),
(4, 4, 1, '<p>dfda</p>', '2017-04-26 06:31:01', '2017-04-26 06:31:01', 'B'),
(5, 5, 1, '<p>dfda</p>', '2017-04-26 06:31:04', '2017-04-26 06:31:04', 'B'),
(6, 6, 1, '<p>dfda</p>', '2017-04-26 06:31:30', '2017-04-26 06:31:30', 'B');

-- --------------------------------------------------------

--
-- Table structure for table `uploads`
--

CREATE TABLE `uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumbnail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `upload` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `upload`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Developer', 'Software', 'fashtop3@gmail.com', '$2y$10$.RdCGhvj5lhE/T2zKtNrO.hq6P1jB4XPtYvekyuU58MbBJN1/o5ou', 0, '', 'l9pmlVZAXot1b278D9s3TmIxp9TkdAregZ31E8Bq7j9opa9IedmmvyevuqMY', '2016-07-31 10:00:56', '2017-05-30 08:16:48', NULL),
(10, 'Ogunbiyi', 'Olawale', 'wale.ogunbiyi@rockcityfmradio.com', '$2y$10$ftWEGfrI/qEGmO0Bebs/ruvuYNYfeAPu8/LJR7/wcY2faDwlKTU2m', 0, '', 'avvKZxVDPVSLwvgZ6iBCxL4Vu5522qF72RijdgwOqCTxikmatl2jKH0HidWL', '2016-08-03 11:51:07', '2016-08-23 11:27:12', NULL),
(12, 'David', 'Olumide', 'david.olumide@rockcityfmradio.com', '$2y$10$9lJjp3LVMnSrNO.6wy1isO2zJaK/KXfiaTh4HezDxPB5vPiaq/9cO', 0, '', 'sSp1JeancSbYmw5RwqZng3AzpimAyJC0t7j4NJkf43TYtSxr5CkUiF9Jwdg8', '2016-08-03 13:24:22', '2016-08-03 13:46:35', NULL),
(13, 'olawale', 'pamilerin', 'jazztixonline@gmail.com', '$2y$10$VylIwtj4D1Su6L6BJjgYfuCjcfC20ssLAINzNB0veeX61ZHfUy7W6', 0, '', 'zHmbGcrk34gWbRTffwC1fQp3y37YiCgmUqbUJgUhEy9SIhdkICAtwula9kI8', '2016-08-07 07:03:28', '2016-08-08 07:36:21', NULL),
(14, 'Malaolu', 'Bukky', 'bukky.malaolu@rockcityfmradio.com', '$2y$10$AMoMhREhAz2VOJXKZGWhEu3125iCcNKnB57LS2sMxNZEsGh9AK.Nm', 0, '', 'SsNeG4nZeZ40zNzFL9q00taE3SoB4CndqC8uES64w3AYxUKw4Qry1UZ02nGz', '2016-09-06 11:59:22', '2016-09-23 12:14:47', NULL),
(15, 'Malaolu', 'Niran', 'niran.malaolu@rockcityfmradio.com', '$2y$10$D2VfKw2m2f8zH6fjK/mXqO3iRkDHNi4jHm5/emA/771Is.9fWBj8e', 0, '', 'FWR2PUTsY0KvrUWOltpjG7WE64uT40tUz37wfgHmYNBBfnJTbMrHBmYMAXGP', '2016-09-07 18:11:04', '2016-09-30 19:05:50', NULL),
(16, 'Niran', 'Malaolu', 'nirano2001@yahoo.com', '$2y$10$cxksnfMLEBRKb4OMcuGPbesMXs04kW4mbk2SAIRQGkoqIVdFyrFMe', 0, '', 'cjE0mQcNYH7HomCshhXKL1hAx2WN2aWhpUPlFKYVT2RUqSScfnRVQ0Ey6jdi', '2016-09-13 13:54:25', '2016-09-29 18:47:52', NULL),
(17, 'ADESINA', 'ALABI', 'adesina.alabi@rockcityfmradio.com', '$2y$10$vgux4xY4z3kUCAYhjHfrVOIbs9/AUszFe6TWMTZRmNK6RNjQp4UWa', 0, '', NULL, '2016-09-23 11:06:11', '2017-05-30 07:05:22', NULL),
(18, 'Akintunde', 'Oyeleye', 'oyeleye@rockcityfmradio.com', '$2y$10$Z4WBhJ8sNBg6AxR3J77QDuPtyeoUpaG4pQIwPHVFi6pttgtIhrr8q', 0, '', 'MagyaIOSwVk7McXMa8MXCMxFZg6r4bpG3wAk2QtdLigrLPGkmMoJaXxIQLVy', '2016-09-23 13:34:10', '2017-05-30 08:46:01', '2017-05-30 08:46:01'),
(19, 'Femi', 'Dele', 'davidladele@hotmail.com', '$2y$10$XKj6o58mZyDj31l8pS5ye.JZmZSjYeBkpKu8bky1oDLvPL.pi6UC2', 0, NULL, '1CspSWMErkoLF2WkAI8fb13gXmiC8U9akOpbwnTH6g7A6bVHiXJ5NUOU6rQV', '2017-05-30 07:59:59', '2017-05-30 08:45:04', '2017-05-30 08:45:04');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `reg` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `eng` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `colour` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `user_id`, `name`, `reg`, `eng`, `colour`, `created_at`, `updated_at`) VALUES
(1, 1, 'camry', 'DKA725KAD', '8438h387374hs', 'white', '2016-12-07 15:20:59', '2016-12-07 15:36:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assessment_config_id` (`assessment_config_id`,`user_id`),
  ADD KEY `assessments_assessment_config_id_foreign` (`assessment_config_id`),
  ADD KEY `assessments_user_id_foreign` (`user_id`);

--
-- Indexes for table `assessment_configs`
--
ALTER TABLE `assessment_configs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_configs_user_id_foreign` (`user_id`);

--
-- Indexes for table `assessment_part_ones`
--
ALTER TABLE `assessment_part_ones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_part_ones_assessment_id_foreign` (`assessment_id`);

--
-- Indexes for table `assessment_part_threes`
--
ALTER TABLE `assessment_part_threes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_part_threes_assessment_id_foreign` (`assessment_id`);

--
-- Indexes for table `assessment_part_twos`
--
ALTER TABLE `assessment_part_twos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_part_twos_assessment_id_foreign` (`assessment_id`);

--
-- Indexes for table `assessment_supervisors`
--
ALTER TABLE `assessment_supervisors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessment_supervisors_user_id_foreign` (`user_id`),
  ADD KEY `assessment_supervisors_assessment_id_foreign` (`assessment_id`);

--
-- Indexes for table `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `challenges_report_id_foreign` (`report_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `clients_user_id_name_unique` (`user_id`,`name`),
  ADD KEY `clients_user_id_foreign` (`user_id`);

--
-- Indexes for table `driver_reports`
--
ALTER TABLE `driver_reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driver_reports_user_id_foreign` (`user_id`),
  ADD KEY `driver_reports_vehicle_id_foreign` (`vehicle_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_slug_unique` (`slug`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_role_permission_id_index` (`permission_id`),
  ADD KEY `permission_role_role_id_index` (`role_id`);

--
-- Indexes for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_user_permission_id_index` (`permission_id`),
  ADD KEY `permission_user_user_id_index` (`user_id`);

--
-- Indexes for table `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `prices_product_id_duration_unique` (`product_id`,`duration`),
  ADD KEY `prices_product_id_index` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_name_unique` (`name`);

--
-- Indexes for table `product_times`
--
ALTER TABLE `product_times`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `promocodes`
--
ALTER TABLE `promocodes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promocodes_code_unique` (`code`);

--
-- Indexes for table `remittances`
--
ALTER TABLE `remittances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `remittances_report_id_foreign` (`report_id`),
  ADD KEY `remittances_target_id_foreign` (`target_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_user_id_foreign` (`user_id`);

--
-- Indexes for table `report_uploads`
--
ALTER TABLE `report_uploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_uploads_report_id_foreign` (`report_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_slug_unique` (`slug`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_role_id_index` (`role_id`),
  ADD KEY `role_user_user_id_index` (`user_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_user_id_foreign` (`user_id`),
  ADD KEY `schedules_client_id_foreign` (`client_id`),
  ADD KEY `marketer_id` (`marketer_id`),
  ADD KEY `marketer_id_2` (`marketer_id`);

--
-- Indexes for table `schedule_alerts`
--
ALTER TABLE `schedule_alerts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_alerts_schedule_id_foreign` (`schedule_id`),
  ADD KEY `schedule_alerts_approved_by_foreign` (`approved_by`),
  ADD KEY `schedule_alerts_validated_by_foreign` (`validated_by`),
  ADD KEY `schedule_alerts_recommended_by_foreign` (`recommended_by`),
  ADD KEY `schedule_alerts_programmed_by_foreign` (`programmed_by`);

--
-- Indexes for table `schedule_products`
--
ALTER TABLE `schedule_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_products_schedule_id_foreign` (`schedule_id`),
  ADD KEY `schedule_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_product_subs_schedule_product_id_foreign` (`schedule_product_id`);

--
-- Indexes for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_product_sub_details_schedule_product_sub_id_foreign` (`schedule_product_sub_id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscription_attachments`
--
ALTER TABLE `subscription_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscription_attachments_schedule_foreign` (`schedule`),
  ADD KEY `subscription_attachments_schedule_product_sub_foreign` (`schedule_product_sub`);

--
-- Indexes for table `targets`
--
ALTER TABLE `targets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `targets_user_id_foreign` (`user_id`),
  ADD KEY `marketer` (`marketer`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_report_id_foreign` (`report_id`);

--
-- Indexes for table `uploads`
--
ALTER TABLE `uploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uploads_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `eng` (`reg`),
  ADD UNIQUE KEY `vehicles_reg_unique` (`reg`),
  ADD UNIQUE KEY `vehicles_eng_unique` (`eng`),
  ADD KEY `vehicles_user_id_foreign` (`user_id`),
  ADD KEY `vehicles_name_index` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `assessment_configs`
--
ALTER TABLE `assessment_configs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `assessment_part_ones`
--
ALTER TABLE `assessment_part_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `assessment_part_threes`
--
ALTER TABLE `assessment_part_threes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `assessment_part_twos`
--
ALTER TABLE `assessment_part_twos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `assessment_supervisors`
--
ALTER TABLE `assessment_supervisors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `driver_reports`
--
ALTER TABLE `driver_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permission_user`
--
ALTER TABLE `permission_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;
--
-- AUTO_INCREMENT for table `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `product_times`
--
ALTER TABLE `product_times`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `promocodes`
--
ALTER TABLE `promocodes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `remittances`
--
ALTER TABLE `remittances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `report_uploads`
--
ALTER TABLE `report_uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;
--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `schedule_alerts`
--
ALTER TABLE `schedule_alerts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `schedule_products`
--
ALTER TABLE `schedule_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;
--
-- AUTO_INCREMENT for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `subscription_attachments`
--
ALTER TABLE `subscription_attachments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `targets`
--
ALTER TABLE `targets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_assessment_config_id_foreign` FOREIGN KEY (`assessment_config_id`) REFERENCES `assessment_configs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assessments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_configs`
--
ALTER TABLE `assessment_configs`
  ADD CONSTRAINT `assessment_configs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_part_ones`
--
ALTER TABLE `assessment_part_ones`
  ADD CONSTRAINT `assessment_part_ones_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_part_threes`
--
ALTER TABLE `assessment_part_threes`
  ADD CONSTRAINT `assessment_part_threes_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_part_twos`
--
ALTER TABLE `assessment_part_twos`
  ADD CONSTRAINT `assessment_part_twos_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assessment_supervisors`
--
ALTER TABLE `assessment_supervisors`
  ADD CONSTRAINT `assessment_supervisors_assessment_id_foreign` FOREIGN KEY (`assessment_id`) REFERENCES `assessments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assessment_supervisors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `challenges`
--
ALTER TABLE `challenges`
  ADD CONSTRAINT `challenges_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `driver_reports`
--
ALTER TABLE `driver_reports`
  ADD CONSTRAINT `driver_reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `driver_reports_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prices`
--
ALTER TABLE `prices`
  ADD CONSTRAINT `prices_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `remittances`
--
ALTER TABLE `remittances`
  ADD CONSTRAINT `remittances_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `remittances_target_id_foreign` FOREIGN KEY (`target_id`) REFERENCES `targets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report_uploads`
--
ALTER TABLE `report_uploads`
  ADD CONSTRAINT `report_uploads_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedules_marketer_id_foreign` FOREIGN KEY (`marketer_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule_alerts`
--
ALTER TABLE `schedule_alerts`
  ADD CONSTRAINT `schedule_alerts_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `schedule_alerts_programmed_by_foreign` FOREIGN KEY (`programmed_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `schedule_alerts_recommended_by_foreign` FOREIGN KEY (`recommended_by`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `schedule_alerts_schedule_id_foreign` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedule_alerts_validated_by_foreign` FOREIGN KEY (`validated_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `schedule_products`
--
ALTER TABLE `schedule_products`
  ADD CONSTRAINT `schedule_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedule_products_schedule_id_foreign` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  ADD CONSTRAINT `schedule_product_subs_schedule_product_id_foreign` FOREIGN KEY (`schedule_product_id`) REFERENCES `schedule_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  ADD CONSTRAINT `schedule_product_sub_details_schedule_product_sub_id_foreign` FOREIGN KEY (`schedule_product_sub_id`) REFERENCES `schedule_product_subs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subscription_attachments`
--
ALTER TABLE `subscription_attachments`
  ADD CONSTRAINT `subscription_attachments_schedule_foreign` FOREIGN KEY (`schedule`) REFERENCES `schedules` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `subscription_attachments_schedule_product_sub_foreign` FOREIGN KEY (`schedule_product_sub`) REFERENCES `schedule_product_subs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `targets`
--
ALTER TABLE `targets`
  ADD CONSTRAINT `targets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `uploads`
--
ALTER TABLE `uploads`
  ADD CONSTRAINT `uploads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
