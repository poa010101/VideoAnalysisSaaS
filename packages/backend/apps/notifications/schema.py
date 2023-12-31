import graphene
from graphene import relay
from graphene.types.generic import GenericScalar
from graphene_django import DjangoObjectType

from common.graphql import mutations
from . import models
from . import serializers
from . import services


class HasUnreadNotificationsMixin:
    has_unread_notifications = graphene.Boolean()

    @staticmethod
    def resolve_has_unread_notifications(parent, info):
        return services.NotificationService.user_has_unread_notifications(user=info.context.user)


class NotificationType(DjangoObjectType):
    data = GenericScalar()

    class Meta:
        model = models.Notification
        interfaces = (relay.Node,)
        fields = "__all__"


class NotificationConnection(graphene.Connection):
    class Meta:
        node = NotificationType


class UpdateNotificationMutation(HasUnreadNotificationsMixin, mutations.UpdateModelMutation):
    class Meta:
        serializer_class = serializers.UpdateNotificationSerializer
        edge_class = NotificationConnection.Edge

    @classmethod
    def get_queryset(cls, model_class: models.Notification, root, info, **input):
        return model_class.objects.filter_by_user(info.context.user)


class MarkReadAllNotificationsMutation(graphene.ClientIDMutation):
    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, **kwargs):
        services.NotificationService.mark_read_all_user_notifications(user=info.context.user)
        return MarkReadAllNotificationsMutation(ok=True)


class Query(HasUnreadNotificationsMixin, graphene.ObjectType):
    all_notifications = graphene.relay.ConnectionField(NotificationConnection)

    @staticmethod
    def resolve_all_notifications(root, info, **kwargs):
        return models.Notification.objects.filter_by_user(info.context.user).order_by('-created_at')


class Mutation(graphene.ObjectType):
    update_notification = UpdateNotificationMutation.Field()
    mark_read_all_notifications = MarkReadAllNotificationsMutation.Field()

    @staticmethod
    def resolve_has_unread_notifications(root, info):
        return models.Notification.objects.filter(user=info.context.user, read_at=None).exists()


class Subscription(graphene.ObjectType):
    notification_created = graphene.relay.ConnectionField(NotificationConnection)

    @staticmethod
    def resolve_notification_created(root, info):
        return root
