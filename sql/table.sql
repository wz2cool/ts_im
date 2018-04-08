-- --------------------------------------------------------
-- 主机:                           118.25.40.123
-- 服务器版本:                        5.7.21 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 ts_im_dev 的数据库结构
CREATE DATABASE IF NOT EXISTS `ts_im_dev` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `ts_im_dev`;

-- 导出  表 ts_im_dev.group 结构
DROP TABLE IF EXISTS `group`;
CREATE TABLE IF NOT EXISTS `group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(100) NOT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `can_invite` bit(1) NOT NULL DEFAULT b'1' COMMENT '群成员可以邀请别人进群，不需要审核',
  `can_register` bit(1) NOT NULL DEFAULT b'1' COMMENT '开放注册',
  `max_user` int(10) unsigned NOT NULL DEFAULT '100',
  `public_group` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可以搜索到这个群',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_name` (`group_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='群组表';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.group_admin 结构
DROP TABLE IF EXISTS `group_admin`;
CREATE TABLE IF NOT EXISTS `group_admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `role` int(10) unsigned NOT NULL COMMENT '1.所有者 2.管理员',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id_user_id` (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群管理';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.group_message 结构
DROP TABLE IF EXISTS `group_message`;
CREATE TABLE IF NOT EXISTS `group_message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `message_id` int(10) unsigned NOT NULL COMMENT '对应message表中ID',
  `send_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_user_id` (`group_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群消息\r\n每个群里面的用户都有一条记录，但是真正消息只有一份，通过messageId查找';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.message 结构
DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message_type` int(10) unsigned NOT NULL COMMENT '1.文字，2.图片，4文件，8.声音',
  `conversation_type` int(10) unsigned NOT NULL COMMENT '1. 私聊，2.群，4.讨论组',
  `sender_user_id` int(10) unsigned NOT NULL COMMENT '发送这条消息的人',
  `content` text NOT NULL COMMENT '可能存base64',
  `source_uri` varchar(255) NOT NULL COMMENT '图片或者文件原地址',
  `send_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息\r\n所有人说的话在这里';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.private_message 结构
DROP TABLE IF EXISTS `private_message`;
CREATE TABLE IF NOT EXISTS `private_message` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `friend_user_id` int(10) unsigned NOT NULL,
  `message_id` int(10) unsigned NOT NULL COMMENT '对应message表中ID',
  `send_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_friend_user_id` (`user_id`,`friend_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='一对一聊天\r\n两个人都有这份消息，所以一次发送，会有两条记录';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.request 结构
DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `request_type` int(10) unsigned NOT NULL COMMENT '1.加好友，2.加群',
  `request_user_id` int(10) unsigned NOT NULL,
  `content` varchar(500) NOT NULL,
  `remark` varchar(500) NOT NULL,
  `match_id` int(10) unsigned NOT NULL COMMENT '加好友就是user_id, 加群就是group_id',
  `create_time` datetime NOT NULL,
  `status` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '0.未处理， 1.同意， 2. 拒绝',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='请求，比如加群，加好友';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user 结构
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `display_name` varchar(255) DEFAULT '“”',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  `deleted` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`),
  KEY `display_name` (`display_name`(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表\r\n1. 用户名，email，mobile 都是唯一。\r\n2. display_name 可以筛选，以后最好用luance';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_conversation 结构
DROP TABLE IF EXISTS `user_conversation`;
CREATE TABLE IF NOT EXISTS `user_conversation` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `conversation_type` int(10) unsigned NOT NULL COMMENT '1.单聊，2.群，4.讨论组',
  `title` varchar(100) NOT NULL,
  `match_id` int(11) NOT NULL COMMENT '单聊就是用户ID，群就是群ID',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL COMMENT '需要排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户会话列表，右边';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_detail 结构
DROP TABLE IF EXISTS `user_detail`;
CREATE TABLE IF NOT EXISTS `user_detail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `age` int(10) unsigned DEFAULT NULL,
  `sex` bit(1) DEFAULT NULL COMMENT '1. 男 2.女',
  `province` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `qq` varchar(50) DEFAULT NULL,
  `wechat` varchar(50) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户详情';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_friend 结构
DROP TABLE IF EXISTS `user_friend`;
CREATE TABLE IF NOT EXISTS `user_friend` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `friend_user_id` int(10) unsigned NOT NULL,
  `user_friend_category_id` int(10) unsigned NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_friend_user_id` (`user_id`,`friend_user_id`),
  KEY `user_friend_category_id` (`user_friend_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户好友\r\n不能同一好友出现两次';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_friend_category 结构
DROP TABLE IF EXISTS `user_friend_category`;
CREATE TABLE IF NOT EXISTS `user_friend_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_index` int(10) unsigned NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_group_name` (`user_id`,`category_name`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='好友分组\r\n一个人不能分组名字一样';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_group 结构
DROP TABLE IF EXISTS `user_group`;
CREATE TABLE IF NOT EXISTS `user_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `user_group_category_id` int(10) unsigned NOT NULL DEFAULT '0',
  `display_name` varchar(100) DEFAULT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id_user_id` (`group_id`,`user_id`),
  KEY `user_group_category_id` (`user_group_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群成员\r\n一个群里面你只能出现一次';

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_group_category 结构
DROP TABLE IF EXISTS `user_group_category`;
CREATE TABLE IF NOT EXISTS `user_group_category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_index` int(10) unsigned NOT NULL,
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_category_name` (`user_id`,`category_name`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 ts_im_dev.user_notification 结构
DROP TABLE IF EXISTS `user_notification`;
CREATE TABLE IF NOT EXISTS `user_notification` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `notificaiton_type` int(10) unsigned NOT NULL COMMENT '1. 系统消息 2.加好友 4.加群',
  `content` varchar(500) DEFAULT NULL,
  `request_id` int(10) unsigned DEFAULT NULL,
  `create_time` datetime NOT NULL COMMENT '需要排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户消息提醒';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
