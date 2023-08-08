/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 5.5.45 : Database - database
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `database`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `account_num` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '账号',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `phone_num` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '15179675028' COMMENT '电话号码',
  `power` int(2) DEFAULT '1' COMMENT '权限',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员信息表';

/*Table structure for table `adopt_favorite` */

DROP TABLE IF EXISTS `adopt_favorite`;

CREATE TABLE `adopt_favorite` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `adopt_id` int(8) NOT NULL COMMENT '领养ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `adopt_id` (`adopt_id`),
  CONSTRAINT `adopt_favorite_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `adopt_favorite_ibfk_4` FOREIGN KEY (`adopt_id`) REFERENCES `adoption` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='领养收藏夹';

/*Table structure for table `adopt_later` */

DROP TABLE IF EXISTS `adopt_later`;

CREATE TABLE `adopt_later` (
  `adopt_id` int(8) NOT NULL COMMENT '领养动物的id',
  `user_id` int(8) NOT NULL COMMENT '领养人id',
  `time` date DEFAULT NULL COMMENT '领养时间',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '回访',
  PRIMARY KEY (`adopt_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `adopt_later_ibfk_1` FOREIGN KEY (`adopt_id`) REFERENCES `adoption` (`id`),
  CONSTRAINT `adopt_later_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='领养后续';

/*Table structure for table `adoption` */

DROP TABLE IF EXISTS `adoption`;

CREATE TABLE `adoption` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `animal_id` int(8) NOT NULL COMMENT '动物种类',
  `user_id` int(8) NOT NULL COMMENT '用户id',
  `img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '动物图片',
  `name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `detail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '定位',
  `time` datetime DEFAULT NULL COMMENT '发布时间',
  `is_adopt` int(1) DEFAULT '0' COMMENT '是否被领养',
  `is_pass` int(1) DEFAULT '0' COMMENT '是否通过审核',
  PRIMARY KEY (`id`),
  KEY `animal_id` (`animal_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `adoption_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`),
  CONSTRAINT `adoption_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `animal` */

DROP TABLE IF EXISTS `animal`;

CREATE TABLE `animal` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `type` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '动物种类',
  `is_pass` int(1) NOT NULL DEFAULT '0' COMMENT '是否审核通过',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `apply` */

DROP TABLE IF EXISTS `apply`;

CREATE TABLE `apply` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `adopt_id` int(8) NOT NULL COMMENT '领养ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `adopt_id` (`adopt_id`),
  CONSTRAINT `apply_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `apply_ibfk_2` FOREIGN KEY (`adopt_id`) REFERENCES `adoption` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='领养申请';

/*Table structure for table `attention` */

DROP TABLE IF EXISTS `attention`;

CREATE TABLE `attention` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `attention_id` int(8) NOT NULL COMMENT '关注用户ID',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `attention_id` (`attention_id`),
  CONSTRAINT `attention_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `attention_ibfk_2` FOREIGN KEY (`attention_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='关注列表';

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(8) NOT NULL COMMENT '用户ID',
  `post_id` int(8) NOT NULL COMMENT '回复的帖子ID',
  `parent_id` int(8) DEFAULT NULL COMMENT '回复的评论ID',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '评论内容',
  `time` datetime DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='评论';

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `to_id` int(8) NOT NULL COMMENT '接收人ID',
  `from_id` int(8) DEFAULT NULL COMMENT '发送人ID',
  `content` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容',
  `is_read` int(1) NOT NULL DEFAULT '0' COMMENT '是否已读',
  `time` datetime DEFAULT NULL COMMENT '时间',
  PRIMARY KEY (`id`),
  KEY `to_id` (`to_id`),
  KEY `from_id` (`from_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`to_id`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`from_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='消息列表';

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `user_id` int(8) NOT NULL COMMENT '用户id',
  `animal_id` int(8) NOT NULL COMMENT '动物种类id',
  `title` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT '内容',
  `time` datetime DEFAULT NULL COMMENT '时间',
  `is_pass` int(1) DEFAULT '0' COMMENT '是否审核通过',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `animal_id` (`animal_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户帖子表';

/*Table structure for table `provincial` */

DROP TABLE IF EXISTS `provincial`;

CREATE TABLE `provincial` (
  `pid` int(8) NOT NULL DEFAULT '0',
  `province` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Table structure for table `stray_animal_base` */

DROP TABLE IF EXISTS `stray_animal_base`;

CREATE TABLE `stray_animal_base` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '基地名称',
  `contact_way` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '联系方式',
  `p_id` int(8) NOT NULL COMMENT '所在省份ID',
  PRIMARY KEY (`id`),
  KEY `p_id` (`p_id`),
  CONSTRAINT `stray_animal_base_ibfk_1` FOREIGN KEY (`p_id`) REFERENCES `provincial` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='流浪动物基地';

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名/账号',
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'animal123' COMMENT '密码',
  `nick_name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `sex` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '未知' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `phone_num` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '电话号码',
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '地址',
  `user_type` int(1) NOT NULL DEFAULT '1' COMMENT '用户类型',
  `head_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'http://localhost:9090/files/b8c18b798111485cb77886ea5b41f7ea' COMMENT '头像路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户信息表';

/*Table structure for table `vet` */

DROP TABLE IF EXISTS `vet`;

CREATE TABLE `vet` (
  `user_id` int(8) NOT NULL COMMENT '用户id',
  `nick_name` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `vet_describe` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '描述',
  `head_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',
  `real_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '真实信息id',
  `is_pass` int(1) DEFAULT '1' COMMENT '是否通过审核',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `vet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='动物医生信息表';

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
