-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 31, 2016 at 12:15 PM
-- Server version: 5.7.13-0ubuntu0.16.04.2
-- PHP Version: 7.0.8-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rockcity_orders`
--
CREATE DATABASE IF NOT EXISTS `rockcity_orders` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `rockcity_orders`;

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

-- --------------------------------------------------------

--
-- Table structure for table `assessment_supervisors`
--

CREATE TABLE `assessment_supervisors` (
  `id` int(10) UNSIGNED NOT NULL,
  `preview` tinyint(1) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `assessment_id` int(10) UNSIGNED NOT NULL,
  `attributes` text COLLATE utf8_unicode_ci NOT NULL,
  `habit` text COLLATE utf8_unicode_ci NOT NULL,
  `leadership` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `driver_reports`
--

CREATE TABLE `driver_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `vehicle_id` int(10) UNSIGNED NOT NULL,
  `info` text COLLATE utf8_unicode_ci NOT NULL,
  `html_text` longtext COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
('2016_07_16_104538_create_schedule_product_sub_details_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `report_uploads`
--

CREATE TABLE `report_uploads` (
  `id` int(10) UNSIGNED NOT NULL,
  `report_id` int(10) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `filepath` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mime` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
(1, 1, 1, '2016-07-31 10:04:27', '2016-07-31 10:04:27');

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
  `mail` int(11) NOT NULL,
  `sent_at` timestamp NULL DEFAULT NULL,
  `resend_at` timestamp NULL DEFAULT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `schedule_products`
--

CREATE TABLE `schedule_products` (
  `id` int(10) UNSIGNED NOT NULL,
  `schedule_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int(10) UNSIGNED NOT NULL,
  `order_no` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `discount` int(11) NOT NULL,
  `discountAmt` decimal(12,2) NOT NULL,
  `commission` int(11) NOT NULL,
  `commissionAmt` decimal(12,2) NOT NULL,
  `subTotal` decimal(12,2) NOT NULL,
  `grandTotal` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `amount` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ayodeji', 'Fashola', 'fashtop3@gmail.com', '$2y$10$qiCi5WY74klp.9mVtgJaQuq/2zvBFfbdAjXlFZFKcbvnQHy4pz/DK', 0, NULL, '2016-07-31 10:00:56', '2016-07-31 10:00:56');

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
-- Indexes for dumped tables
--

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
-- Indexes for table `assessments`
--
ALTER TABLE `assessments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assessments_assessment_config_id_foreign` (`assessment_config_id`),
  ADD KEY `assessments_user_id_foreign` (`user_id`);

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
  ADD UNIQUE KEY `clients_name_unique` (`name`),
  ADD UNIQUE KEY `clients_email_unique` (`email`),
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
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_slug_unique` (`slug`);

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
-- Indexes for table `remittances`
--
ALTER TABLE `remittances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `remittances_report_id_foreign` (`report_id`),
  ADD KEY `remittances_target_id_foreign` (`target_id`);

--
-- Indexes for table `report_uploads`
--
ALTER TABLE `report_uploads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_uploads_report_id_foreign` (`report_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_user_id_foreign` (`user_id`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_role_id_index` (`role_id`),
  ADD KEY `role_user_user_id_index` (`user_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_slug_unique` (`slug`);

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
-- Indexes for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_product_sub_details_schedule_product_sub_id_foreign` (`schedule_product_sub_id`);

--
-- Indexes for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_product_subs_schedule_product_id_foreign` (`schedule_product_id`);

--
-- Indexes for table `schedule_products`
--
ALTER TABLE `schedule_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_products_schedule_id_foreign` (`schedule_id`),
  ADD KEY `schedule_products_product_id_foreign` (`product_id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedules_user_id_foreign` (`user_id`),
  ADD KEY `schedules_client_id_foreign` (`client_id`);

--
-- Indexes for table `targets`
--
ALTER TABLE `targets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `targets_user_id_foreign` (`user_id`);

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
-- AUTO_INCREMENT for table `assessment_configs`
--
ALTER TABLE `assessment_configs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessment_part_ones`
--
ALTER TABLE `assessment_part_ones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessment_part_threes`
--
ALTER TABLE `assessment_part_threes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessment_part_twos`
--
ALTER TABLE `assessment_part_twos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessment_supervisors`
--
ALTER TABLE `assessment_supervisors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `assessments`
--
ALTER TABLE `assessments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `driver_reports`
--
ALTER TABLE `driver_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permission_user`
--
ALTER TABLE `permission_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
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
-- AUTO_INCREMENT for table `remittances`
--
ALTER TABLE `remittances`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `report_uploads`
--
ALTER TABLE `report_uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `schedule_alerts`
--
ALTER TABLE `schedule_alerts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedule_products`
--
ALTER TABLE `schedule_products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `targets`
--
ALTER TABLE `targets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `uploads`
--
ALTER TABLE `uploads`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

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
-- Constraints for table `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `assessments_assessment_config_id_foreign` FOREIGN KEY (`assessment_config_id`) REFERENCES `assessment_configs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assessments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `report_uploads`
--
ALTER TABLE `report_uploads`
  ADD CONSTRAINT `report_uploads_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `schedule_product_sub_details`
--
ALTER TABLE `schedule_product_sub_details`
  ADD CONSTRAINT `schedule_product_sub_details_schedule_product_sub_id_foreign` FOREIGN KEY (`schedule_product_sub_id`) REFERENCES `schedule_product_subs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule_product_subs`
--
ALTER TABLE `schedule_product_subs`
  ADD CONSTRAINT `schedule_product_subs_schedule_product_id_foreign` FOREIGN KEY (`schedule_product_id`) REFERENCES `schedule_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedule_products`
--
ALTER TABLE `schedule_products`
  ADD CONSTRAINT `schedule_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedule_products_schedule_id_foreign` FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schedules`
--
ALTER TABLE `schedules`
  ADD CONSTRAINT `schedules_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `schedules_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
